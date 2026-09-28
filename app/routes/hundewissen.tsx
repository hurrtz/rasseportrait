import type { Route } from "./+types/hundewissen";
import { Hundewissen } from "../pages/Hundewissen";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Hundewissen · Rasseportrait" },
    {
      name: "description",
      content:
        "Hintergründe zu Themen, die im Podcast Tierisch Menschlich immer wieder vorkommen.",
    },
  ];
}

export default () => <Hundewissen />;
