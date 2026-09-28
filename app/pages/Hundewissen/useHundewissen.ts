import { useEffect } from "react";
import {
  useHundewissenActions,
  useHundewissenIndex,
  useHundewissenStatus,
  useTopicState,
} from "~/stores/hundewissen";

/** Starts loading hundewissen.json on first use */
export const useEnsureHundewissen = () => {
  const status = useHundewissenStatus();
  const index = useHundewissenIndex();
  const { initialize } = useHundewissenActions();

  useEffect(() => {
    if (status === "idle") initialize();
  }, [status, initialize]);

  return { status, index, retry: initialize };
};

/** Starts loading hundewissen/<id>.json on first use */
export const useEnsureTopic = (id: string) => {
  const state = useTopicState(id);
  const { loadTopic } = useHundewissenActions();

  useEffect(() => {
    if (!state) loadTopic(id);
  }, [state, id, loadTopic]);

  return { state, retry: () => loadTopic(id) };
};

/** Where a visitor came from, passed as link state to the topic page */
export type TopicReferrer =
  | "overview"
  | "frequent"
  | "area"
  | "search"
  | "related"
  | "breed"
  | "direct";

export interface TopicLinkState {
  from: TopicReferrer;
}
