import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { HundewissenIndex, HundewissenTopic } from "types/hundewissen";
import { BASE_PATH } from "~/constants";
import { logger } from "~/utils/logger";

export type LoadStatus = "idle" | "loading" | "ready" | "error";

export type TopicState =
  | { status: "loading" | "error" }
  | { status: "ready"; topic: HundewissenTopic };

interface State {
  index: HundewissenIndex | null;
  status: LoadStatus;
  error: string | null;
  /** topic files loaded so far, by id */
  topics: Record<string, TopicState>;
  actions: {
    /** Loads hundewissen.json once; after an error it may be called again */
    initialize: () => Promise<void>;
    /** Loads hundewissen/<id>.json once; after an error it may be called again */
    loadTopic: (id: string) => Promise<void>;
  };
}

let indexInflight: Promise<void> | null = null;
const topicInflight = new Map<string, Promise<void>>();

const fetchJson = async <T>(file: string): Promise<T> => {
  const response = await fetch(`${BASE_PATH}data/${file}`);
  if (!response.ok) {
    throw new Error(
      `Failed to load ${file}: ${response.status} ${response.statusText}`,
    );
  }
  return (await response.json()) as T;
};

const INITIAL = { index: null, status: "idle", error: null, topics: {} } as const;

const useHundewissenStore = create<State>()(
  devtools(
    (set, get) => ({
      ...INITIAL,
      actions: {
        initialize: () => {
          const { status } = get();
          if (status === "ready") return Promise.resolve();
          if (status === "loading" && indexInflight) return indexInflight;

          set({ status: "loading", error: null }, undefined, "initialize");
          indexInflight = fetchJson<HundewissenIndex>("hundewissen.json")
            .then((index) => {
              logger.info(
                `Loaded ${index.topics.length} Hundewissen topics (${index.indexedEpisodes} episodes)`,
              );
              set({ index, status: "ready" }, undefined, "initialize:success");
            })
            .catch((e) => {
              logger.error("Failed to initialize Hundewissen:", e);
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
              indexInflight = null;
            });
          return indexInflight;
        },

        loadTopic: (id) => {
          const current = get().topics[id];
          if (current?.status === "ready") return Promise.resolve();
          const inflight = topicInflight.get(id);
          if (inflight) return inflight;

          const setTopic = (state: TopicState, action: string) =>
            set(
              (previous) => ({ topics: { ...previous.topics, [id]: state } }),
              undefined,
              action,
            );

          setTopic({ status: "loading" }, "loadTopic");
          const request = fetchJson<HundewissenTopic>(`hundewissen/${id}.json`)
            .then((topic) =>
              setTopic({ status: "ready", topic }, "loadTopic:success"),
            )
            .catch((e) => {
              logger.error(`Failed to load Hundewissen topic ${id}:`, e);
              setTopic({ status: "error" }, "loadTopic:error");
            })
            .finally(() => {
              topicInflight.delete(id);
            });
          topicInflight.set(id, request);
          return request;
        },
      },
    }),
    { name: "hundewissen" },
  ),
);

/** Back to the state before anything loaded (tests) */
export const resetHundewissenStore = () => {
  indexInflight = null;
  topicInflight.clear();
  useHundewissenStore.setState({ ...INITIAL, topics: {} });
};

export const useHundewissenIndex = () =>
  useHundewissenStore((state) => state.index);

export const useHundewissenStatus = () =>
  useHundewissenStore((state) => state.status);

export const useHundewissenActions = () =>
  useHundewissenStore((state) => state.actions);

export const useTopicState = (id: string | undefined) =>
  useHundewissenStore((state) => (id ? state.topics[id] : undefined));

export default useHundewissenStore;
