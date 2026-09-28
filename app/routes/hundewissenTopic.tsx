import type { Route } from "./+types/hundewissenTopic";
import { TopicPage } from "../pages/Hundewissen";
import useHundewissenStore from "~/stores/hundewissen";

/** Loads the index and the topic file so the page title can name the topic */
export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  const { actions } = useHundewissenStore.getState();
  await actions.initialize();
  const known = useHundewissenStore
    .getState()
    .index?.topics.find(({ id }) => id === params.topic);
  if (!known) return { label: null, description: null };

  await actions.loadTopic(known.id);
  const state = useHundewissenStore.getState().topics[known.id];
  return {
    label: known.label,
    description: state?.status === "ready" ? state.topic.description : "",
  };
}

export function meta({ data }: Route.MetaArgs) {
  return [
    {
      title: `${data?.label ?? "Thema nicht gefunden"} · Hundewissen · Rasseportrait`,
    },
    {
      name: "description",
      content:
        data?.description ||
        "Alle Stellen zu einem Thema im Podcast Tierisch Menschlich.",
    },
  ];
}

export default () => <TopicPage />;
