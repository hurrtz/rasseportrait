// Exercise the generated browser engine against real static assets, without a
// server. This measures engine work and bytes, not browser/mobile render time.
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { pathToFileURL } from "node:url";
import { resolve } from "node:path";
import {
  aliasPattern,
  SEARCH_ALIASES,
  resolveSearchQuery,
} from "../app/pages/Hundewissen/searchAliases.ts";
import {
  episodeHit,
  excerptParts,
  searchCompleteWords,
} from "../app/pages/Hundewissen/transcriptSearch.ts";
import { parseTranscript } from "./hundewissen/search.ts";

let bytes = 0;
let requests = 0;
globalThis.document = {
  currentScript: null,
  querySelector: () => ({ getAttribute: () => "de" }),
};
globalThis.fetch = async (url) => {
  const data = await readFile(new URL(url));
  bytes += data.byteLength;
  requests++;
  return new Response(data, {
    headers: { "Content-Type": "application/octet-stream" },
  });
};
const engine = await import(
  pathToFileURL(resolve("public/hundewissen-search/pagefind.js")).href
);
await engine.options({ excerptLength: 48 });
const started = performance.now();
const result = await searchCompleteWords(engine, "french bulldog");
const first = await Promise.all(
  result.results.slice(0, 6).map((hit) => hit.data()),
);
// Node imports the module from disk and uses the main-thread fallback. Include
// both browser JS files when reporting the cold browser asset budget.
const runtimeBytes = (
  await Promise.all(
    ["pagefind.js", "pagefind-worker.js"].map(
      async (name) =>
        (await readFile(`public/hundewissen-search/${name}`)).byteLength,
    ),
  )
).reduce((total, size) => total + size, 0);
const cold = {
  dataBytes: bytes,
  runtimeBytes,
  totalAssetBytes: bytes + runtimeBytes,
  requests,
  milliseconds: Math.round(performance.now() - started),
};
assert(
  cold.totalAssetBytes < 1_000_000,
  "Cold query and six results exceed the 1 MB search budget",
);
for (const query of [
  "Frenchie",
  "französische Bulldogge",
  "franzoesische bulldogge",
]) {
  const same = await searchCompleteWords(engine, query);
  assert.deepEqual(
    same.results.map(({ id }) => id),
    result.results.map(({ id }) => id),
    query,
  );
}
const data = await Promise.all(result.results.map((hit) => hit.data()));
const ids = new Set();
for (const raw of data) {
  const hit = episodeHit(raw);
  assert(!ids.has(hit.episode.id), "Duplicate episode result");
  ids.add(hit.episode.id);
  assert(hit.passages.length > 0, `No timed results: ${hit.episode.id}`);
  for (const passage of hit.passages) {
    assert(
      passage.start >= 0 && passage.end > passage.start,
      "Invalid passage range",
    );
    const visible = excerptParts(
      passage.excerpt,
      "french bulldog",
      passage.start,
    )
      .map(({ text }) => text)
      .join("");
    assert(
      !/synbreed\d+x|<\/?mark>/.test(visible),
      "Search markup leaked into displayed text",
    );
  }
}
const source = JSON.parse(
  await readFile("db/podcast/topic-index.json", "utf8"),
);
const missing = [];
let checked = 0;
for (const id of Object.keys(source.episodes)) {
  const text = await readFile(`.podcast/transcripts/${id}.txt`, "utf8").catch(
    (error) => {
      if (error.code === "ENOENT") return null;
      throw error;
    },
  );
  if (!text) continue;
  checked++;
  const spoken = parseTranscript(text)
    .map(({ text }) => text)
    .join(" ");
  if (aliasPattern(SEARCH_ALIASES[0].pattern).test(spoken) && !ids.has(id))
    missing.push(id);
}
assert.deepEqual(missing, [], "Transcript breed mentions missing from search");
const noMatches = await searchCompleteWords(engine, "xylophonunfindbarzxq");
assert.equal(noMatches.results.length, 0);
const report = {
  query: "french bulldog",
  recordings: result.results.length,
  cold,
  localTranscriptsChecked: checked,
  firstResults: first.map((raw) => {
    const hit = episodeHit(raw);
    return {
      id: hit.episode.id,
      passages: hit.passages.length,
      start: hit.passages[0].start,
    };
  }),
};
console.log(JSON.stringify(report, null, 2));
