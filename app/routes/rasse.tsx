import type { Route } from "./+types/rasse";
import { Rasse } from "../pages/Rasse";
import useBreedsStore from "~/stores/breeds";

/** Loads the breeds first so the page title can name the breed */
export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  await useBreedsStore.getState().actions.initialize();
  const breed = useBreedsStore
    .getState()
    .breeds.find(({ slug }) => slug === params.slug);
  return { name: breed?.details.public[0] ?? null };
}

export function meta({ data }: Route.MetaArgs) {
  const title = data?.name
    ? `${data.name} · Rasseportrait`
    : "Rasse nicht gefunden · Rasseportrait";
  return [
    { title },
    {
      name: "description",
      content: data?.name
        ? `${data.name} im Rasseportrait von Tierisch Menschlich`
        : "Rasseportrait",
    },
  ];
}

export default () => <Rasse />;
