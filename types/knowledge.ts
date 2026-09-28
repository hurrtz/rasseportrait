import type { Podcast, FurtherReading } from "./breed";

export interface KnowledgeTopic {
  id: string;
  title: {
    internal: string;
    public: string;
  };
  /** One line for the topic list */
  summary: string;
  /** "draft" while the topic is still being researched */
  status: "draft" | "published";
  content: string;
  podcast: Podcast[];
  furtherReading: FurtherReading[];
}
