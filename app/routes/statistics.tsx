import type { Route } from "./+types/statistics";
import { Statistics } from "../pages/Statistics";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Statistik · Rasseportrait" },
    {
      name: "description",
      content:
        "Wie viele Rassen vorgestellt wurden, wer sie errät und wie sie sich auf die FCI-Gruppen verteilen.",
    },
  ];
}

export default () => <Statistics />;
