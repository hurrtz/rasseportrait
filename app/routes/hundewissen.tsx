import type { Route } from "./+types/hundewissen";
import { Hundewissen } from "../pages/Hundewissen";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Hundewissen" },
    { name: "description", content: "Hundewissen - Wissenswertes über Hunde" },
  ];
}

export default () => <Hundewissen />;
