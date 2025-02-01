import type { Podcast, EnrichedPodcast, FurtherReading } from "./general";

interface PodcastWithKeywords extends Podcast {
  keywords?: string[];
}

export interface Topic {
  id: number | string;
  title: string;
  podcast: PodcastWithKeywords[];
  furtherReading?: FurtherReading[];
  keywords?: string[];
}

export interface EnrichedTopic extends Omit<Topic, "image" | "podcast"> {
  image: string;
  podcast: EnrichedPodcast[];
}

export type TopicIdentifier =
  | {
      id: string | number;
      variantName?: string;
    }
  | undefined;
