import type { Route } from "./+types/hundewissenArea";
import { AreaPage } from "../pages/Hundewissen";
import useHundewissenStore from "~/stores/hundewissen";

/** Loads the index so the page title can name the area */
export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  await useHundewissenStore.getState().actions.initialize();
  const area = useHundewissenStore
    .getState()
    .index?.areas.find(({ slug }) => slug === params.area);
  return { name: area?.name ?? null };
}

export function meta({ data }: Route.MetaArgs) {
  return [
    {
      title: `${data?.name ?? "Bereich nicht gefunden"} · Hundewissen · Rasseportrait`,
    },
    {
      name: "description",
      content: data?.name
        ? `Alle Themen aus dem Bereich ${data.name} im Podcast Tierisch Menschlich.`
        : "Hundewissen aus dem Podcast Tierisch Menschlich.",
    },
  ];
}

export default () => <AreaPage />;
