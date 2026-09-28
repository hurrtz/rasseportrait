import type { Route } from "./+types/hundewissen";
import { OverviewPage } from "../pages/Hundewissen";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Hundewissen · Rasseportrait" },
    {
      name: "description",
      content:
        "Alles, was im Podcast Tierisch Menschlich neben den Rasseportraits besprochen wird, mit Sprung zur Stelle in der Folge.",
    },
  ];
}

export default () => <OverviewPage />;
