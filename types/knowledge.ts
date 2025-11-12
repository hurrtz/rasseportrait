import type { Podcast, FurtherReading } from "./breed";

export interface KnowledgeTopic {
  id: string;
  title: {
    internal: string;
    public: string;
  };
  description: string;
  content: string;
  podcast: Podcast[];
  furtherReading: FurtherReading[];
}
