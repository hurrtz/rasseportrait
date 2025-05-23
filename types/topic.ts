import type { Podcast, FurtherReading } from "./breed";

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
  podcast: Podcast[];
}

export type TopicIdentifier =
  | {
      id: string | number;
      variantName?: string;
    }
  | undefined;
