import { createHash } from "node:crypto";
import {
  readFile,
  mkdir,
  rm,
  rename,
  writeFile,
  access,
} from "node:fs/promises";
import { join } from "node:path";
import * as pagefind from "pagefind";
import type { TopicIndexFile } from "./hundewissen/compile";
import type { HundewissenIndex } from "types/hundewissen";
import { episodeDocument } from "./hundewissen/search";

const output = "public/hundewissen-search";
const manifestPath = join(output, "manifest.json");
const transcriptDir =
  process.env.PODCAST_TRANSCRIPTS_DIR ?? ".podcast/transcripts";
const force = process.argv.includes("--rebuild");
const hash = (value: string | Buffer) =>
  createHash("sha256").update(value).digest("hex");

async function run() {
  const started = Date.now();
  const source = await readFile("db/podcast/topic-index.json", "utf8");
  const overview = await readFile("public/data/hundewissen.json", "utf8");
  const index: TopicIndexFile = JSON.parse(source);
  const topics: HundewissenIndex = JSON.parse(overview);
  const code = await readFile("scripts/hundewissen/search.ts", "utf8");
  const builder = await readFile("scripts/compileHundewissenSearch.ts", "utf8");
  const aliases = await readFile(
    "app/pages/Hundewissen/searchAliases.ts",
    "utf8",
  );
  const packageInfo = JSON.parse(
    await readFile("node_modules/pagefind/package.json", "utf8"),
  );
  const sourceHash = hash(
    [source, overview, code, builder, aliases, packageInfo.version].join("\n"),
  );
  const previous = await readFile(manifestPath, "utf8")
    .then(JSON.parse)
    .catch(() => null);
  const transcripts = new Map<string, string>();
  const missing: string[] = [];
  for (const id of Object.keys(index.episodes).sort()) {
    try {
      transcripts.set(
        id,
        await readFile(join(transcriptDir, `${id}.txt`), "utf8"),
      );
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error;
      missing.push(id);
    }
  }
  const transcriptHashes = Object.fromEntries(
    [...transcripts].map(([id, text]) => [id, hash(text)]),
  );
  const matching =
    previous?.sourceHash === sourceHash &&
    Object.entries(transcriptHashes).every(
      ([id, digest]) => previous.transcripts?.[id] === digest,
    );
  const filesPresent =
    previous?.files &&
    (
      await Promise.all(
        previous.files.map((file: string) =>
          access(join(output, file))
            .then(() => true)
            .catch(() => false),
        ),
      )
    ).every(Boolean);
  if (!force && matching && filesPresent) {
    console.log(
      `Search index current (${previous.episodes} episodes${missing.length ? "; using committed assets without local transcripts" : ""}).`,
    );
    return;
  }
  if (missing.length) {
    throw new Error(
      `Search index needs rebuilding, but ${missing.length} transcripts are missing (${missing.slice(0, 3).join(", ")}). Restore .podcast/transcripts and run npm run build:search. An unchanged checkout can reuse committed search assets.`,
    );
  }
  const temporary = `${output}.tmp`;
  await rm(temporary, { recursive: true, force: true });
  await mkdir(temporary, { recursive: true });
  try {
    const created = await pagefind.createIndex({ forceLanguage: "de" });
    if (!created.index || created.errors.length)
      throw new Error(created.errors.join("\n"));
    const topicLinks = new Map(
      topics.topics.map(({ id, label, area }) => [id, { id, label, area }]),
    );
    let passages = 0;
    for (const [id, transcript] of transcripts) {
      const document = episodeDocument(id, index, transcript, topicLinks);
      passages += document.episode.passages.length;
      const result = await created.index.addHTMLFile({
        url: `/hundewissen?folge=${id}&q=${encodeURIComponent(index.episodes[id].title)}`,
        content: document.content,
      });
      if (result.errors.length)
        throw new Error(`${id}: ${result.errors.join("\n")}`);
    }
    const { files, errors } = await created.index.getFiles();
    if (errors.length) throw new Error(errors.join("\n"));
    // The custom React UI only needs the engine and data, not Pagefind's UI CSS/JS.
    const required = files.filter(
      ({ path }) =>
        !/pagefind-(?:ui|modular-ui|highlight)|pagefind-component-ui/.test(
          path,
        ),
    );
    for (const file of required) {
      const target = join(temporary, file.path);
      await mkdir(join(target, ".."), { recursive: true });
      await writeFile(target, file.content);
    }
    const manifest = {
      sourceHash,
      pagefind: packageInfo.version,
      episodes: transcripts.size,
      passages,
      bytes: required.reduce(
        (total, file) => total + file.content.byteLength,
        0,
      ),
      transcripts: transcriptHashes,
      files: required.map(({ path }) => path).sort(),
    };
    await writeFile(join(temporary, "manifest.json"), JSON.stringify(manifest));
    await rm(output, { recursive: true, force: true });
    await rename(temporary, output);
    console.log(
      `Search: ${manifest.episodes} episodes, ${passages} passages, ${(manifest.bytes / 1e6).toFixed(2)} MB static assets, ${((Date.now() - started) / 1000).toFixed(1)}s.`,
    );
  } finally {
    await pagefind.close();
    await rm(temporary, { recursive: true, force: true });
  }
}

run().catch((error: Error) => {
  console.error(error.message);
  process.exitCode = 1;
});
