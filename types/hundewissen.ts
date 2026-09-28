/**
 * Hundewissen: everything the podcast discusses besides the breed portraits,
 * as areas → topics → entries (an episode plus a time range). Compiled by
 * scripts/compileHundewissen.cjs from db/podcast/topic-index.json.
 */

export type EntryWeight = "main" | "side";

export type EntryKind =
  | "discussion"
  | "listener_question"
  | "expert"
  | "anecdote"
  | "news";

/** Spotify and RTL+ as on the breed pages; "audio" is the feed's mp3 */
export type ListenProvider = "spotify" | "rtl" | "audio";

export interface AreaImage {
  src: string;
  thumbnail: string;
  alt: string;
  /** CSS object-position, e.g. "50% 30%" */
  position?: string;
}

export interface HundewissenArea {
  slug: string;
  name: string;
  /** Tabler icon name, e.g. "IconMessages" */
  icon: string;
  topicCount: number;
  image?: AreaImage;
}

export interface HundewissenTopicSummary {
  id: string;
  label: string;
  /** area slug */
  area: string;
  episodeCount: number;
  entryCount: number;
}

/** public/data/hundewissen.json */
export interface HundewissenIndex {
  /** ISO date of the topic index */
  generated: string;
  indexedEpisodes: number;
  totalEpisodes: number;
  /** only areas with topics, by topic count */
  areas: HundewissenArea[];
  /** every topic, by episode count */
  topics: HundewissenTopicSummary[];
}

export interface HundewissenEntry {
  /** what this passage is about */
  label: string;
  /** "12:04", "1:02:08" */
  start: string;
  end: string;
  startSeconds: number;
  endSeconds: number;
  /** rounded, at least 1 */
  minutes: number;
  weight: EntryWeight;
  kind: EntryKind;
  summaries: string[];
  listen: { url: string; provider: ListenProvider };
}

export interface HundewissenEpisode {
  /** pipeline episode id, e.g. "rtl-231" */
  id: string;
  /** as the site numbers it: 231, "Summer Edition #4" */
  number: number | string;
  title: string;
  /** ISO date */
  airDate?: string;
  /** by start */
  entries: HundewissenEntry[];
}

export interface HundewissenBreed {
  slug: string;
  name: string;
  thumbnail: string;
  relation: "portrait" | "mentioned";
  /** pipeline episode id */
  episode: string;
  /** the episode's number, for "Rasseportrait in Folge {n}" */
  number: number | string;
}

export interface HundewissenEditorial {
  content: string;
  status: "draft" | "published";
}

/** public/data/hundewissen/<id>.json */
export interface HundewissenTopic {
  id: string;
  label: string;
  area: string;
  description: string;
  episodeCount: number;
  entryCount: number;
  totalMinutes: number;
  /** the "Direkt zum Thema" entry: episodes[episode].entries[entry] */
  featured: { episode: number; entry: number };
  /** newest first */
  episodes: HundewissenEpisode[];
  /** at most 4 */
  breeds: HundewissenBreed[];
  /** topic ids, at most 4 */
  related: string[];
  editorial?: HundewissenEditorial;
}

/** db/knowledge/<id>/index.ts: an optional editorial text for a topic */
export interface EditorialOverlay {
  id: string;
  title: { internal: string; public: string };
  status: "draft" | "published";
  content: string;
}
