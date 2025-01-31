import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { EnrichedTopic } from "../../types/topic";

interface TopicsState {
  currentTopics: EnrichedTopic[];
  setCurrentTopics: (topics: EnrichedTopic[]) => void;
}

const useTopicsStore = create<TopicsState>()(
  devtools(
    (set) => ({
      currentTopics: [],
      setCurrentTopics: (currentTopics) =>
        set(() => ({ currentTopics }), undefined, "setTopics"),
    }),
    { name: "Topics", store: "Topics" },
  ),
);

export { useTopicsStore };
