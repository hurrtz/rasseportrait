import type { Route } from "./+types/home";
import { Statistics } from "../pages/Statistics";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Statistiken" },
    { name: "description", content: "Statistiken" },
  ];
}

export default () => <Statistics />;
