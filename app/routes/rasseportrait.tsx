import type { Route } from "./+types/rasseportrait";
import { Rasseportrait } from "../pages/rasseportrait";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Rasseportrait · Alle Hunderassen aus Tierisch Menschlich" },
    {
      name: "description",
      content:
        "Alle Rasseportraits aus dem Podcast Tierisch Menschlich, mit Timecode zum Anhören.",
    },
  ];
}

export default () => <Rasseportrait />;
