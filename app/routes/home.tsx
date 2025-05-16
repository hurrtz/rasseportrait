import type { Route } from "./+types/home";
import { Rasseportrait } from "../rasseportrait";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Rasseportrait" },
    { name: "description", content: "Rasseportrait" },
  ];
}

export default () => <Rasseportrait />;
