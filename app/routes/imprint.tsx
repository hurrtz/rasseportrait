import type { Route } from "./+types/imprint";
import { Imprint } from "../pages/imprint";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Impressum" },
    { name: "description", content: "Impressum" },
  ];
}

export default () => <Imprint />;
