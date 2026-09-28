import { clientLoader, meta } from "../rasse";
import { makeBreed, resetBreedsStore, seedBreeds } from "~/test-utils";

type LoaderArgs = Parameters<typeof clientLoader>[0];
type MetaArgs = Parameters<typeof meta>[0];

describe("/rasse/:slug route", () => {
  beforeEach(() => resetBreedsStore());

  it("loads the breed name for the page title", async () => {
    seedBreeds([makeBreed()]);

    const data = await clientLoader({
      params: { slug: "border-collie" },
    } as unknown as LoaderArgs);

    expect(data).toEqual({ name: "Border Collie" });
  });

  it("titles the page with the breed name", () => {
    const tags = meta({ data: { name: "Border Collie" } } as MetaArgs);

    expect(tags).toContainEqual({ title: "Border Collie · Rasseportrait" });
  });

  it("titles an unknown slug as not found", () => {
    const tags = meta({ data: { name: null } } as MetaArgs);

    expect(tags).toContainEqual({
      title: "Rasse nicht gefunden · Rasseportrait",
    });
  });
});
