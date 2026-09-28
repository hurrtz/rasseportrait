import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { KnowledgeTopic } from "../../types/knowledge";
import { BASE_PATH } from "~/constants";
import { logger } from "~/utils/logger";

export type KnowledgeStatus = "idle" | "loading" | "ready" | "error";

interface State {
  topics: KnowledgeTopic[];
  status: KnowledgeStatus;
  error: string | null;
  actions: {
    /** Loads knowledge.json once; after an error it may be called again */
    initialize: () => Promise<void>;
  };
}

let inflight: Promise<void> | null = null;

const fetchTopics = async (): Promise<KnowledgeTopic[]> => {
  const response = await fetch(`${BASE_PATH}data/knowledge.json`);
  if (!response.ok) {
    throw new Error(
      `Failed to load knowledge topics: ${response.status} ${response.statusText}`,
    );
  }

  const data = await response.json();
  const topics = data.topics as KnowledgeTopic[] | undefined;
  if (!topics?.length) throw new Error("No knowledge topics found");

  logger.info(
    `Loaded ${topics.length} knowledge topics (compiled: ${data.meta?.compiled})`,
  );
  return topics;
};

const useKnowledgeStore = create<State>()(
  devtools(
    (set, get) => ({
      topics: [],
      status: "idle",
      error: null,
      actions: {
        initialize: () => {
          const { status } = get();
          if (status === "ready") return Promise.resolve();
          if (status === "loading" && inflight) return inflight;

          set({ status: "loading", error: null }, undefined, "initialize");
          inflight = fetchTopics()
            .then((topics) =>
              set({ topics, status: "ready" }, undefined, "initialize:success"),
            )
            .catch((e) => {
              logger.error("Failed to initialize knowledge topics:", e);
              set(
                {
                  status: "error",
                  error: e instanceof Error ? e.message : "Unknown error",
                },
                undefined,
                "initialize:error",
              );
            })
            .finally(() => {
              inflight = null;
            });
          return inflight;
        },
      },
    }),
    { name: "knowledge" },
  ),
);

export const useKnowledgeTopics = () =>
  useKnowledgeStore((state) => state.topics);

export const useKnowledgeStatus = () =>
  useKnowledgeStore((state) => state.status);

export const useKnowledgeActions = () =>
  useKnowledgeStore((state) => state.actions);

export default useKnowledgeStore;
