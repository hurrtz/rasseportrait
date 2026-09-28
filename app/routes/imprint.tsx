import type { Route } from "./+types/imprint";
import { Imprint } from "../pages/imprint";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Impressum · Rasseportrait" },
    {
      name: "description",
      content: "Impressum und Kontakt des Fanprojekts Rasseportrait.",
    },
  ];
}

export default () => <Imprint />;
