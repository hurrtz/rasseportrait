import type { SearchEpisode, SearchTopicLink } from "types/hundewissen-search";
import type { TopicIndexFile } from "./compile";
import {
  SEARCH_ALIASES,
  aliasPattern,
} from "../../app/pages/Hundewissen/searchAliases";

export interface TranscriptLine {
  start: number;
  text: string;
}

/** Both Whisper's [h:mm:ss] and publisher VTT-derived [hh:mm:ss.sss]. */
export const parseTranscript = (text: string): TranscriptLine[] => {
  const lines: TranscriptLine[] = [];
  for (const line of text.split(/\r?\n/)) {
    if (!line.trim()) continue;
    const match = line.match(/^\[(\d+:\d{2}:\d{2}(?:\.\d+)?)\]\s*(.+)$/);
    if (!match)
      throw new Error(`Invalid transcript line: ${line.slice(0, 80)}`);
    const start = match[1]
      .split(":")
      .reduce((n, part) => n * 60 + Number(part), 0);
    if (lines.length && start < lines[lines.length - 1].start) {
      throw new Error("Transcript timestamps must be chronological");
    }
    lines.push({ start, text: match[2] });
  }
  if (!lines.length) throw new Error("Transcript is empty");
  return lines;
};

const seconds = (value: string) =>
  value.split(":").reduce((n, part) => n * 60 + Number(part), 0);

export const escapeHtml = (value: string) =>
  value.replace(
    /[&<>"']/g,
    (char) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      })[char]!,
  );

const annotateAliases = (text: string) => {
  let html = escapeHtml(text);
  for (const alias of SEARCH_ALIASES) {
    html = html.replace(
      aliasPattern(alias.pattern),
      (name) =>
        `<span data-pagefind-index-attrs="data-alias" data-alias="${alias.token}">${name}</span>`,
    );
  }
  return html;
};

const splitsAlias = (before: string, after: string) =>
  SEARCH_ALIASES.some(({ pattern }) =>
    [...`${before} ${after}`.matchAll(aliasPattern(pattern))].some(
      (match) =>
        match.index < before.length &&
        match.index + match[0].length > before.length + 1,
    ),
  );

/**
 * One virtual document per recording, with timed headings for sub-results.
 * This keeps result hydration bounded to episodes, rather than thousands of
 * independent passage requests. Virtual HTML is never published as a page.
 */
export const episodeDocument = (
  id: string,
  index: TopicIndexFile,
  transcript: string,
  topicLinks: Map<string, SearchTopicLink>,
) => {
  const record = index.episodes[id];
  if (!record) throw new Error(`Unknown episode ${id}`);
  const audio = new URL(record.audioUrl);
  if (!/^https?:$/.test(audio.protocol))
    throw new Error(`Invalid audio URL for ${id}`);
  const lines = parseTranscript(transcript);
  const entries = index.topics.flatMap((topic) =>
    topic.entries
      .filter((entry) => entry.episode === id)
      .map((entry) => ({
        start: seconds(entry.start),
        end: seconds(entry.end),
        text: [entry.label, ...entry.summaries]
          .map((part) => (/[.!?]$/.test(part) ? part : `${part}.`))
          .join(" "),
        topic: topicLinks.get(topic.id),
      })),
  );
  // Keep every spoken line once, with a short lead-in to the matching words.
  // A breed name spanning two lines must stay in one searchable passage.
  const chunks: TranscriptLine[][] = [];
  for (const event of lines) {
    const previous = chunks.at(-1);
    if (
      !previous ||
      (event.start - previous[0].start >= 20 &&
        !splitsAlias(previous.at(-1)?.text ?? "", event.text))
    )
      chunks.push([event]);
    else previous.push(event);
  }
  const passages = chunks.map((chunk, i) => {
    const start = Math.floor(chunk[0].start);
    const end = Math.max(
      start + 1,
      Math.ceil(
        chunks[i + 1]?.[0].start ??
          Math.max(record.duration, lines.at(-1)!.start + 10),
      ),
    );
    const topics = new Map<string, SearchTopicLink>();
    entries
      .filter((entry) => entry.start < end && entry.end > start)
      .forEach(({ topic }) => {
        if (topic) topics.set(topic.id, topic);
      });
    return {
      anchor: `t-${start}`,
      start,
      end,
      topics: [...topics.values()],
      summary: false,
      text: chunk.map(({ text }) => text).join(" "),
    };
  });
  // Separate headings prevent excerpts from splicing editorial summaries into
  // spoken sentences. Each summary keeps its exact curated range.
  entries.forEach((entry, i) =>
    passages.push({
      anchor: `s-${i}`,
      start: entry.start,
      end: entry.end,
      topics: entry.topic ? [entry.topic] : [],
      summary: true,
      text: entry.text,
    }),
  );
  passages.sort((a, b) => a.start - b.start);
  const episode: SearchEpisode = {
    id,
    number: record.number,
    title: record.title,
    published: record.published,
    audioUrl: record.audioUrl,
    passages: passages.map(({ text, ...passage }) => passage),
  };
  const body = passages
    .map(({ anchor, start, text, summary }) => {
      return `<section><h2 id="${anchor}">${start}</h2><p${summary ? ' data-pagefind-weight="2"' : ""}>${annotateAliases(text)}</p></section>`;
    })
    .join("\n");
  return {
    episode,
    content: `<!doctype html><html lang="de"><head><meta data-pagefind-meta="episode[content]" content="${escapeHtml(JSON.stringify(episode))}"><title>${escapeHtml(record.title)}</title></head><body data-pagefind-body>${body}</body></html>`,
  };
};
