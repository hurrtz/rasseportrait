export interface SearchTopicLink {
  id: string;
  label: string;
  area: string;
}

export interface SearchPassage {
  anchor: string;
  start: number;
  end: number;
  topics: SearchTopicLink[];
  summary?: boolean;
}

/** Metadata stored with each lazily loaded Pagefind episode fragment. */
export interface SearchEpisode {
  id: string;
  number: number | string;
  title: string;
  published: string;
  audioUrl: string;
  passages: SearchPassage[];
}

export interface PassageHit extends SearchPassage {
  /** Escaped text with Pagefind's <mark> highlights. Rendered without innerHTML. */
  excerpt: string;
}

export interface EpisodeHit {
  episode: SearchEpisode;
  passages: PassageHit[];
}
