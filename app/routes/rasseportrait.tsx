import type { Route } from "./+types/rasseportrait";
import { Rasseportrait } from "../pages/rasseportrait";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Rasseportrait" },
    { name: "description", content: "Rasseportrait" },
  ];
}

export default () => <Rasseportrait />;
