/**
 * db/podcast/topic-index.json + breeds.json → the Hundewissen data the site
 * loads: one small index for the overview and area pages, one file per
 * topic. Pure; scripts/compileHundewissen.cjs does the reading and writing.
 */
import type { Breed, Podcast } from "types/breed";
import type {
  EditorialOverlay,
  EntryKind,
  EntryWeight,
  HundewissenArea,
  HundewissenBreed,
  HundewissenEntry,
  HundewissenEpisode,
  HundewissenIndex,
  HundewissenTopic,
  ListenProvider,
} from "types/hundewissen";
import { AREAS } from "~/pages/Hundewissen/areas";
import { BASE_PATH } from "~/constants";
import { getIllustrations, toDisplayBreeds } from "~/utils/breed";
import { formatTimecode } from "~/utils/format";

// ---------------------------------------------------------------------------
// Input: db/podcast/topic-index.json, as scripts/podcast_index writes it

export interface IndexEpisode {
  feed: "rtl" | "mina" | string;
  number: number | string;
  title: string;
  published: string;
  duration: number;
  audioUrl: string;
  breeds: Array<{ name: string; start: string }>;
  portrait: { present: boolean; breed: string; start: string };
}

export interface IndexEntry {
  label: string;
  episode: string;
  number: number | string;
  title: string;
  /** "0:30:28" */
  start: string;
  end: string;
  weight: EntryWeight;
  kind: EntryKind;
  summaries: string[];
}

export interface IndexTopic {
  id: string;
  label: string;
  category: string;
  description: string;
  episodeCount: number;
  entries: IndexEntry[];
}

export interface TopicIndexFile {
  generated: string;
  indexedEpisodes: number;
  totalEpisodes: number;
  episodes: Record<string, IndexEpisode>;
  topics: IndexTopic[];
}

export interface CompileInput {
  index: TopicIndexFile;
  /** public/data/breeds.json `breeds` */
  rawBreeds: Breed[];
  /** db/knowledge/<id>/index.ts */
  editorial?: EditorialOverlay[];
  /** whether public/illustrations/hundewissen/<slug>/illustration.jpeg exists */
  hasAreaImage?: (slug: string) => boolean;
  /** alt text and focal point per area slug; defaults to areas.ts */
  areaImages?: Record<string, { alt: string; position?: string }>;
  warn?: (message: string) => void;
}

export interface CompileOutput {
  index: HundewissenIndex;
  topics: HundewissenTopic[];
}

const MAX_BREEDS = 4;
const MAX_RELATED = 4;
const TOPIC_ID = /^[a-z0-9][a-z0-9-]*$/;

const collator = new Intl.Collator("de");

/** "0:30:28" / "30:28" → seconds */
const toSeconds = (timecode: string) =>
  timecode.split(":").reduce((total, part) => total * 60 + Number(part), 0);

const toMinutes = (seconds: number) => Math.max(1, Math.round(seconds / 60));

// ---------------------------------------------------------------------------
// Episodes: the site's number, date and sources for each indexed episode

/** Same rule as the pipeline's normalize_title, plus the "Folge N" prefix */
export const normalizeTitle = (title: string) =>
  title
    .normalize("NFC")
    .toLowerCase()
    .replace(/^folge\s*\d+\s*[:\-–]?\s*/, "")
    .replace(/&/g, " und ")
    .replace(/[^a-z0-9äöüß]+/g, "");

interface SiteEpisode {
  key: string;
  number: number | string;
  title: string;
  airDate: string;
  sources: Podcast["sources"];
  /** where the portrait starts in this episode, when it has one */
  portraitTimecode?: number;
}

const siteEpisodes = (rawBreeds: Breed[]) => {
  const byTitle = new Map<string, SiteEpisode>();

  const add = (podcast: Podcast) => {
    const key = normalizeTitle(podcast.episode);
    const portraitTimecode =
      podcast.meta.internal === "portrait" ? podcast.meta.timecode : undefined;
    const known = byTitle.get(key);
    if (!known) {
      byTitle.set(key, {
        key,
        number: podcast.number,
        title: podcast.episode,
        airDate: podcast.meta.airDate,
        sources: [...podcast.sources],
        portraitTimecode,
      });
      return;
    }
    known.portraitTimecode ??= portraitTimecode;
    // breeds of one episode may list different sources; keep them all
    podcast.sources.forEach((source) => {
      if (!known.sources.some(({ url }) => url === source.url)) {
        known.sources.push(source);
      }
    });
  };

  rawBreeds.forEach((breed) => {
    breed.podcast.forEach(add);
    breed.details.variants?.forEach((variant) => variant.podcast?.forEach(add));
  });

  const byNumber = new Map<number, SiteEpisode[]>();
  byTitle.forEach((episode) => {
    if (typeof episode.number !== "number") return;
    byNumber.set(episode.number, [
      ...(byNumber.get(episode.number) ?? []),
      episode,
    ]);
  });

  return { byTitle, byNumber };
};

/**
 * The feed publishes RTL episodes about two weeks after the site's air date;
 * further apart means a rerun (Summer Editions) or another episode that
 * happens to share the number (the Mina era counts from 1 again).
 */
const SAME_EPISODE_DAYS = 60;

const daysApart = (a: string, b: string) =>
  Math.abs(Date.parse(a) - Date.parse(b)) / 86_400_000;

interface ResolvedEpisode {
  id: string;
  number: number | string;
  title: string;
  airDate?: string;
  sources: Podcast["sources"];
  audioUrl: string;
  record: IndexEpisode;
  /** seconds to subtract from the transcript's timecodes */
  shift: number;
  /** the site episode this is a rerun of, when it is one */
  rerunOf?: string;
  /** the site episode it resolved to */
  siteKey?: string;
}

/**
 * A rerun's audio differs from the original's (new intro), so its timecodes
 * only fit the original's Spotify/RTL+ links when the portrait lines the two
 * up. Otherwise it plays from its own feed audio.
 */
const rerunTiming = (record: IndexEpisode, match: SiteEpisode) =>
  record.portrait.present &&
  record.portrait.start &&
  match.portraitTimecode !== undefined
    ? { shift: toSeconds(record.portrait.start) - match.portraitTimecode, sources: match.sources }
    : { shift: 0, sources: [] };

const resolveEpisodes = (
  episodes: Record<string, IndexEpisode>,
  rawBreeds: Breed[],
  warn: (message: string) => void,
) => {
  const site = siteEpisodes(rawBreeds);
  const resolved = new Map<string, ResolvedEpisode>();

  Object.entries(episodes).forEach(([id, record]) => {
    const near = (episode: SiteEpisode) =>
      !record.published ||
      daysApart(record.published, episode.airDate) <= SAME_EPISODE_DAYS;
    const byNumber =
      record.feed === "rtl" && typeof record.number === "number"
        ? site.byNumber.get(record.number)?.filter(near)
        : undefined;
    const match =
      site.byTitle.get(normalizeTitle(record.title)) ??
      (byNumber?.length === 1 ? byNumber[0] : undefined);

    if (!match) {
      warn(`${id} (${record.number}: ${record.title}) has no breed data; using the feed`);
    }
    const rerun = match && !near(match);
    const timing = rerun
      ? rerunTiming(record, match)
      : { shift: 0, sources: match?.sources ?? [] };

    resolved.set(id, {
      id,
      number: match?.number ?? record.number,
      title: match?.title ?? record.title,
      airDate: match?.airDate ?? (record.published || undefined),
      audioUrl: record.audioUrl,
      record,
      ...timing,
      ...(rerun ? { rerunOf: match.key } : {}),
      ...(match ? { siteKey: match.key } : {}),
    });
  });

  // an original and its rerun are one episode on the site; keep the original
  const originals = new Set(
    [...resolved.values()].filter(({ rerunOf, siteKey }) => siteKey && !rerunOf).map(({ siteKey }) => siteKey),
  );
  resolved.forEach((episode, id) => {
    if (episode.rerunOf && originals.has(episode.rerunOf)) resolved.delete(id);
  });

  return resolved;
};

/** Spotify at the timecode, else RTL+ (no timecodes), else the feed's audio */
const listenTarget = (
  episode: ResolvedEpisode,
  startSeconds: number,
): { url: string; provider: ListenProvider } => {
  const spotify = episode.sources.find(({ provider }) => provider === "spotify");
  if (spotify) {
    const glue = spotify.url.includes("?") ? "&" : "?";
    return { url: `${spotify.url}${glue}t=${startSeconds}`, provider: "spotify" };
  }

  const rtl =
    episode.sources.find(
      ({ provider, type }) => provider === "rtl" && type === "audio",
    ) ?? episode.sources.find(({ provider }) => provider === "rtl");
  if (rtl) return { url: rtl.url, provider: "rtl" };

  return { url: `${episode.audioUrl}#t=${startSeconds}`, provider: "audio" };
};

/** ISO dates sort as text; undated episodes count as oldest */
const newestFirst = (a?: string, b?: string) =>
  (b ?? "").localeCompare(a ?? "");

// ---------------------------------------------------------------------------
// Breeds: portrait and mentions of the topic's episodes → breed pages

const breedKey = (name: string) =>
  name
    .replace(/\s*\([^)]*\)/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();

interface BreedTarget {
  slug: string;
  name: string;
  thumbnail: string;
}

const breedTargets = (rawBreeds: Breed[]) => {
  const targets = new Map<string, BreedTarget>();

  toDisplayBreeds(rawBreeds).forEach((breed) => {
    const illustrations = getIllustrations(breed);
    const name = breed.details.public[0];
    const slug = breed.slug ?? "";

    breed.details.public.forEach((publicName) => {
      const key = breedKey(publicName);
      if (!targets.has(key)) {
        targets.set(key, { slug, name, thumbnail: illustrations[0].thumbnail });
      }
    });
    breed.details.variants?.forEach((variant, index) => {
      const key = breedKey(variant.public);
      if (!targets.has(key)) {
        targets.set(key, {
          slug,
          name,
          thumbnail: (illustrations[index] ?? illustrations[0]).thumbnail,
        });
      }
    });
  });

  return targets;
};

const topicBreeds = (
  episodes: HundewissenEpisode[],
  resolved: Map<string, ResolvedEpisode>,
  targets: Map<string, BreedTarget>,
): HundewissenBreed[] => {
  const portraits: HundewissenBreed[] = [];
  const inside: HundewissenBreed[] = [];
  const others: HundewissenBreed[] = [];

  episodes.forEach((episode) => {
    const { record, shift } = resolved.get(episode.id) as ResolvedEpisode;
    const at = (relation: HundewissenBreed["relation"], name: string) => {
      const target = targets.get(breedKey(name));
      return target
        ? { ...target, relation, episode: episode.id, number: episode.number }
        : undefined;
    };

    if (record.portrait.present && record.portrait.breed) {
      const portrait = at("portrait", record.portrait.breed);
      if (portrait) portraits.push(portrait);
    }

    record.breeds.forEach(({ name, start }) => {
      const mention = at("mentioned", name);
      if (!mention) return;
      const seconds = toSeconds(start) - shift;
      const within = episode.entries.some(
        (entry) =>
          seconds >= entry.startSeconds &&
          seconds <= entry.startSeconds + entryLength(entry),
      );
      (within ? inside : others).push(mention);
    });
  });

  const seen = new Set<string>();
  return [...portraits, ...inside, ...others]
    .filter(({ slug }) => !seen.has(slug) && Boolean(seen.add(slug)))
    .slice(0, MAX_BREEDS);
};

const entryLength = (entry: HundewissenEntry) =>
  entry.endSeconds - entry.startSeconds;

// ---------------------------------------------------------------------------
// Topics

const validate = (topics: IndexTopic[], episodes: Record<string, IndexEpisode>) => {
  const ids = new Set<string>();

  topics.forEach(({ id, entries }) => {
    if (!TOPIC_ID.test(id)) throw new Error(`Topic id "${id}" is not URL-safe`);
    if (ids.has(id)) throw new Error(`Duplicate topic id "${id}"`);
    ids.add(id);
    if (!entries.length) throw new Error(`Topic "${id}" has no entries`);

    entries.forEach(({ episode, start, end }) => {
      if (!episodes[episode]) {
        throw new Error(`Topic "${id}" refers to unknown episode ${episode}`);
      }
      if (toSeconds(end) < toSeconds(start)) {
        throw new Error(`Topic "${id}": entry in ${episode} ends (${end}) before it starts (${start})`);
      }
    });
  });
};

const groupEpisodes = (
  topic: IndexTopic,
  resolved: Map<string, ResolvedEpisode>,
): HundewissenEpisode[] => {
  const grouped = new Map<string, HundewissenEpisode>();

  topic.entries.forEach((entry) => {
    // reruns whose original is indexed too are left out
    const episode = resolved.get(entry.episode);
    if (!episode) return;
    const startSeconds = Math.max(0, toSeconds(entry.start) - episode.shift);
    const endSeconds = Math.max(0, toSeconds(entry.end) - episode.shift);
    const compiled: HundewissenEntry = {
      label: entry.label,
      start: formatTimecode(startSeconds),
      end: formatTimecode(endSeconds),
      startSeconds,
      endSeconds,
      minutes: toMinutes(endSeconds - startSeconds),
      weight: entry.weight,
      kind: entry.kind,
      summaries: entry.summaries,
      listen: listenTarget(episode, startSeconds),
    };

    const group = grouped.get(episode.id) ?? {
      id: episode.id,
      number: episode.number,
      title: episode.title,
      ...(episode.airDate ? { airDate: episode.airDate } : {}),
      entries: [],
    };
    group.entries.push(compiled);
    grouped.set(episode.id, group);
  });

  const episodes = [...grouped.values()].sort((a, b) =>
    newestFirst(a.airDate, b.airDate),
  );
  episodes.forEach((episode) =>
    episode.entries.sort((a, b) => a.startSeconds - b.startSeconds),
  );
  return episodes;
};

/** Longest main entry, ties → newest episode; no main entry → longest entry */
const pickFeatured = (episodes: HundewissenEpisode[]) => {
  const candidates = episodes.flatMap((episode, episodeIndex) =>
    episode.entries.map((entry, entryIndex) => ({
      entry,
      position: { episode: episodeIndex, entry: entryIndex },
    })),
  );
  const main = candidates.filter(({ entry }) => entry.weight === "main");
  const pool = main.length ? main : candidates;

  // episodes are newest first, so the first of equally long entries wins
  return pool.reduce((best, candidate) =>
    entryLength(candidate.entry) > entryLength(best.entry) ? candidate : best,
  ).position;
};

const rankRelated = (
  topic: HundewissenTopic,
  all: HundewissenTopic[],
  episodeSets: Map<string, Set<string>>,
) => {
  const own = episodeSets.get(topic.id) as Set<string>;

  return all
    .filter(({ id }) => id !== topic.id)
    .map((other) => ({
      other,
      shared: [...(episodeSets.get(other.id) as Set<string>)].filter((id) =>
        own.has(id),
      ).length,
    }))
    .filter(({ shared }) => shared > 0)
    .sort(
      (a, b) =>
        b.shared - a.shared ||
        Number(b.other.area === topic.area) - Number(a.other.area === topic.area) ||
        b.other.episodeCount - a.other.episodeCount ||
        collator.compare(a.other.label, b.other.label),
    )
    .slice(0, MAX_RELATED)
    .map(({ other }) => other.id);
};

const bySize = (a: HundewissenTopic, b: HundewissenTopic) =>
  b.episodeCount - a.episodeCount ||
  b.entryCount - a.entryCount ||
  collator.compare(a.label, b.label);

const areaImage = (slug: string, meta?: { alt: string; position?: string }) => {
  if (!meta?.alt) {
    throw new Error(`Area ${slug} has an illustration but no image alt text (areas.ts)`);
  }
  const base = `${BASE_PATH}illustrations/hundewissen/${slug}/illustration`;
  return {
    src: `${base}.jpeg`,
    thumbnail: `${base}_thumbnail.jpeg`,
    alt: meta.alt,
    ...(meta.position ? { position: meta.position } : {}),
  };
};

const AREA_IMAGES = Object.fromEntries(
  AREAS.flatMap((area) => (area.image ? [[area.slug, area.image]] : [])),
);

export const compileHundewissen = ({
  index,
  rawBreeds,
  editorial = [],
  hasAreaImage = () => false,
  areaImages = AREA_IMAGES,
  warn = () => {},
}: CompileInput): CompileOutput => {
  validate(index.topics, index.episodes);

  const areasByName = new Map(AREAS.map((area) => [area.name, area]));
  const resolved = resolveEpisodes(index.episodes, rawBreeds, warn);
  const targets = breedTargets(rawBreeds);
  const overlays = new Map(editorial.map((overlay) => [overlay.id, overlay]));
  const episodeSets = new Map<string, Set<string>>();

  const topics: HundewissenTopic[] = index.topics.flatMap((topic) => {
    const area = areasByName.get(topic.category);
    if (!area) {
      warn(`Topic "${topic.id}" has the unknown area "${topic.category}"; skipped`);
      return [];
    }

    const episodes = groupEpisodes(topic, resolved);
    if (!episodes.length) {
      warn(`Topic "${topic.id}" only occurs in reruns of indexed episodes; skipped`);
      return [];
    }
    const overlay = overlays.get(topic.id);
    episodeSets.set(topic.id, new Set(episodes.map(({ id }) => id)));

    return [
      {
        id: topic.id,
        label: topic.label,
        area: area.slug,
        description: topic.description,
        episodeCount: episodes.length,
        entryCount: episodes.reduce((sum, { entries }) => sum + entries.length, 0),
        totalMinutes: toMinutes(
          episodes
            .flatMap(({ entries }) => entries)
            .reduce((sum, entry) => sum + entryLength(entry), 0),
        ),
        featured: pickFeatured(episodes),
        episodes,
        breeds: topicBreeds(episodes, resolved, targets),
        related: [],
        ...(overlay
          ? { editorial: { content: overlay.content, status: overlay.status } }
          : {}),
      },
    ];
  });

  topics.forEach((topic) => {
    topic.related = rankRelated(topic, topics, episodeSets);
  });
  topics.sort(bySize);

  overlays.forEach((_, id) => {
    if (!topics.some((topic) => topic.id === id)) {
      warn(`db/knowledge/${id} has no topic in the index; not shown`);
    }
  });

  const counts = new Map<string, number>();
  topics.forEach(({ area }) => counts.set(area, (counts.get(area) ?? 0) + 1));

  const areas: HundewissenArea[] = AREAS.filter(({ slug }) => counts.has(slug))
    .map((area) => ({
      slug: area.slug,
      name: area.name,
      icon: area.icon,
      topicCount: counts.get(area.slug) as number,
      ...(hasAreaImage(area.slug)
        ? { image: areaImage(area.slug, areaImages[area.slug]) }
        : {}),
    }))
    // stable sort: ties keep the order of the area table
    .sort((a, b) => b.topicCount - a.topicCount);

  return {
    index: {
      generated: index.generated,
      indexedEpisodes: index.indexedEpisodes,
      totalEpisodes: index.totalEpisodes,
      areas,
      topics: topics.map(({ id, label, area, episodeCount, entryCount }) => ({
        id,
        label,
        area,
        episodeCount,
        entryCount,
      })),
    },
    topics,
  };
};
