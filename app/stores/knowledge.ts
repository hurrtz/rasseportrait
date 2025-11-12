import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { KnowledgeTopic } from "../../types/knowledge";
import { logger } from "~/utils/logger";

const KNOWLEDGE_STORE_NAME = "knowledge";
const ERROR_NO_TOPICS_FOUND = "No knowledge topics found";
const ERROR_UNKNOWN = "Unknown error occurred";

interface KnowledgeActions {
  initialize: () => Promise<void>;
  setTopics: (topics: KnowledgeTopic[]) => void;
  setSelectedTopic: (id?: string) => void;
}

interface State {
  topics: KnowledgeTopic[];
  selectedTopic?: string;
  loading: boolean;
  error: string | null;
  initialized: boolean;
  actions: KnowledgeActions;
}

const initialState: Omit<State, "actions"> = {
  topics: [],
  loading: false,
  error: null,
  initialized: false,
};

const useKnowledgeStore = create<State>()(
  devtools(
    (set) => ({
      ...initialState,
      actions: {
        initialize: async () => {
          const state = useKnowledgeStore.getState();
          if (state.initialized || state.loading) return;

          set({ loading: true, error: null }, undefined, "initialize:start");

          try {
            // Fetch knowledge data from compiled JSON
            const response = await fetch("/rasseportrait/data/knowledge.json");
            if (!response.ok) {
              throw new Error(
                `Failed to load knowledge topics: ${response.status} ${response.statusText}`
              );
            }

            const data = await response.json();
            const topics = data.topics as KnowledgeTopic[];

            if (!topics || !topics.length) {
              throw new Error(ERROR_NO_TOPICS_FOUND);
            }

            logger.info(
              `Loaded ${topics.length} knowledge topics from JSON (compiled: ${data.meta?.compiled})`
            );

            set(
              {
                topics,
                initialized: true,
                loading: false,
              },
              undefined,
              "initialize:success"
            );
          } catch (e) {
            const error = e instanceof Error ? e.message : ERROR_UNKNOWN;
            logger.error("Failed to initialize knowledge topics:", e);
            set(
              { error, loading: false, initialized: false },
              undefined,
              "initialize:error"
            );
          }
        },
        setTopics: (topics: KnowledgeTopic[]) =>
          set({ topics }, undefined, "setTopics"),
        setSelectedTopic: (id?: string) =>
          set({ selectedTopic: id }, undefined, "setSelectedTopic"),
      },
    }),
    { name: KNOWLEDGE_STORE_NAME }
  )
);

// Selectors and hooks
export const useKnowledgeTopics = () =>
  useKnowledgeStore((state) => state.topics);
export const useSelectedTopicId = () =>
  useKnowledgeStore((state) => state.selectedTopic);
export const useKnowledgeActions = () =>
  useKnowledgeStore((state) => state.actions);
export const useKnowledgeLoading = () =>
  useKnowledgeStore((state) => state.loading);
export const useKnowledgeError = () =>
  useKnowledgeStore((state) => state.error);
export const useKnowledgeInitialized = () =>
  useKnowledgeStore((state) => state.initialized);

// Export the store itself for testing purposes
export default useKnowledgeStore;
