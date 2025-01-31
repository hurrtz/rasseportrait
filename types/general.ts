export interface Podcast {
  number: number | string;
  episode: string;
  url: string;
  timecode: number;
  type?: string;
  airDate: string;
  context?: "Hörerfrage" | "Persönliche Anekote" | "Rasseportrait" | string;
}

export interface EnrichedPodcast extends Omit<Podcast, "airDate"> {
  airDate: Date;
}

export interface FurtherReading {
  name: string;
  url: string;
}
