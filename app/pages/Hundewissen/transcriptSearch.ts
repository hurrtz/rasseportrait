import { BASE_PATH } from "~/constants";
import type {
  EpisodeHit,
  PassageHit,
  SearchEpisode,
} from "types/hundewissen-search";
import { aliasPattern, resolveSearchQuery } from "./searchAliases";

interface PagefindData {
  meta: { episode: string };
  sub_results: { url: string; excerpt: string; anchor?: { id: string } }[];
}

interface PagefindResult {
  id: string;
  data: () => Promise<PagefindData>;
}

interface SearchEngine {
  options: (options: {
    baseUrl: string;
    excerptLength: number;
  }) => Promise<void>;
  search: (query: string) => Promise<{ results: PagefindResult[] }>;
}

let engine: Promise<SearchEngine> | undefined;
const loadEngine = () => {
  engine ??= (async () => {
    // An absolute URL also lets Vite serve this prebuilt public module in dev,
    // without rewriting it into a source-module request (?import).
    const path = new URL(
      `${BASE_PATH}hundewissen-search/pagefind.js`,
      window.location.origin,
    ).href;
    const api: SearchEngine = await import(/* @vite-ignore */ path);
    await api.options({ baseUrl: BASE_PATH, excerptLength: 48 });
    return api;
  })().catch((error) => {
    engine = undefined;
    throw error;
  });
  return engine;
};

/** Merge neighboring hits in the same recording; preserve its own timecodes. */
export const mergePassages = (passages: PassageHit[]): PassageHit[] => {
  const merged: PassageHit[] = [];
  for (const passage of [...passages].sort((a, b) => a.start - b.start)) {
    const last = merged.at(-1);
    if (last && passage.start <= last.end) {
      last.end = Math.max(last.end, passage.end);
      last.topics = [
        ...new Map(
          [...last.topics, ...passage.topics].map((topic) => [topic.id, topic]),
        ).values(),
      ];
      if (passage.summary && !last.summary) {
        last.excerpt = passage.excerpt;
        last.summary = true;
      }
      // Keep the first snippet short. Every additional matching minute remains
      // inside the displayed continuous time range, rather than duplicate cards.
    } else merged.push({ ...passage, topics: [...passage.topics] });
  }
  return merged;
};

export const episodeHit = (data: PagefindData): EpisodeHit => {
  const episode: SearchEpisode = JSON.parse(data.meta.episode);
  const byAnchor = new Map(
    episode.passages.map((passage) => [passage.anchor, passage]),
  );
  const hits = new Map<string, PassageHit>();
  for (const result of data.sub_results) {
    const passage = byAnchor.get(result.anchor?.id ?? "");
    if (passage)
      hits.set(passage.anchor, {
        ...passage,
        excerpt: result.excerpt.replace(
          new RegExp(`^${passage.start}\\.\\s*`),
          "",
        ),
      });
  }
  return { episode, passages: mergePassages([...hits.values()]) };
};

export interface TranscriptSearchResult {
  count: number;
  load: (offset: number, limit: number) => Promise<EpisodeHit[]>;
}

/** Pagefind also matches words shorter than the query (e.g. XY for Xylophon).
 * Require each complete word to exist before using its broader ranked search.
 * Explicit quoted phrases retain Pagefind's exact-phrase behavior.
 */
export const searchCompleteWords = async (
  api: Pick<SearchEngine, "search">,
  query: string,
) => {
  const term = resolveSearchQuery(query).term;
  if (/^\s*".+"\s*$/.test(term)) return api.search(term);
  const words = [...new Set(term.match(/[\p{L}\p{N}]+/gu) ?? [])];
  if (!words.length) return { results: [] };
  const checks = await Promise.all(
    words.map((word) => api.search(`"${word}"`)),
  );
  if (checks.some(({ results }) => !results.length)) return { results: [] };
  return api.search(term);
};

export const searchTranscripts = async (
  query: string,
): Promise<TranscriptSearchResult> => {
  const api = await loadEngine();
  const { results } = await searchCompleteWords(api, query);
  return {
    count: results.length,
    load: (offset, limit) =>
      Promise.all(
        results
          .slice(offset, offset + limit)
          .map(async (result) => episodeHit(await result.data())),
      ),
  };
};

export const audioAt = (source: string, start: number) => {
  const url = new URL(source);
  if (!/^https?:$/.test(url.protocol)) return undefined;
  url.hash = `t=${Math.floor(start)}`;
  return url.href;
};

const decode = (text: string) =>
  text.replace(
    /&(?:amp|lt|gt|quot|#39|#x27);/gi,
    (entity) =>
      ({
        "&amp;": "&",
        "&lt;": "<",
        "&gt;": ">",
        "&quot;": '"',
        "&#39;": "'",
        "&#x27;": "'",
      })[entity.toLowerCase()] ?? entity,
  );

/** Parse only the highlighting we need; transcript text is never rendered as HTML. */
export const excerptParts = (excerpt: string, query: string, start: number) => {
  const clean = excerpt
    .replace(/(?:<mark>)?synbreed\d+x\.?(?:<\/mark>)?\.?\s*/gi, "")
    .replace(new RegExp(`^${start}\\.\\s*`), "");
  let parts = clean
    .split(/(<mark>.*?<\/mark>)/g)
    .filter(Boolean)
    .map((text) => ({
      text: decode(text.replace(/^<mark>|<\/mark>$/g, "")),
      highlight: text.startsWith("<mark>"),
    }));
  for (const alias of resolveSearchQuery(query).aliases) {
    parts = parts.flatMap((part) => {
      if (part.highlight) return [part];
      const next: typeof parts = [];
      let end = 0;
      for (const match of part.text.matchAll(aliasPattern(alias.pattern))) {
        if (match.index > end)
          next.push({
            text: part.text.slice(end, match.index),
            highlight: false,
          });
        next.push({ text: match[0], highlight: true });
        end = match.index + match[0].length;
      }
      if (end < part.text.length)
        next.push({ text: part.text.slice(end), highlight: false });
      return next;
    });
  }
  return parts;
};
