import { readFileSync } from "fs";
import { join } from "path";
import type { Breed, Podcast } from "types/breed";
import {
  assignSlugs,
  breedSlug,
  fciGroupLabel,
  getIllustrations,
  getListenUrl,
  getNewestPortraitBreed,
  getPrimaryPortrait,
  toDisplayBreeds,
} from "../breed";

const podcast = (overrides: Partial<Podcast> = {}): Podcast => ({
  number: 7,
  episode: "Folge sieben",
  sources: [],
  meta: {
    internal: "portrait",
    public: "Rasseportrait",
    timecode: 2690,
    airDate: "2026-04-08",
    isGuessable: undefined,
    isGuessedCorrectly: undefined,
    guessedBy: undefined,
  },
  ...overrides,
});

const breed = (overrides: Partial<Breed> = {}): Breed => ({
  id: 297,
  details: { internal: "border_collie", public: ["Border Collie"] },
  classification: { fci: { group: 1, section: 1, standardNumber: 297 } },
  podcast: [podcast()],
  furtherReading: [],
  ...overrides,
});

const spotify = {
  url: "https://open.spotify.com/episode/abc",
  type: "audio" as const,
  provider: "spotify" as const,
};
const rtl = {
  url: "https://plus.rtl.de/podcast/x",
  type: "audio" as const,
  provider: "rtl" as const,
};

describe("getPrimaryPortrait", () => {
  it("prefers the portrait entry over earlier appearances", () => {
    const anecdote = podcast({
      number: 3,
      meta: { ...podcast().meta, internal: "personal_anecdote" },
    });
    const portrait = podcast({ number: 9 });

    expect(getPrimaryPortrait(breed({ podcast: [anecdote, portrait] }))).toBe(
      portrait,
    );
  });

  it("falls back to the first entry when there is no portrait", () => {
    const other = podcast({ meta: { ...podcast().meta, internal: "other" } });

    expect(getPrimaryPortrait(breed({ podcast: [other] }))).toBe(other);
  });

  it("returns undefined without any entry", () => {
    expect(getPrimaryPortrait(breed({ podcast: [] }))).toBeUndefined();
  });
});

describe("getListenUrl", () => {
  it("prefers Spotify and jumps to the timecode", () => {
    expect(getListenUrl(podcast({ sources: [rtl, spotify] }))).toEqual({
      url: "https://open.spotify.com/episode/abc?t=2690",
      provider: "spotify",
      type: "audio",
    });
  });

  it("appends the timecode to an existing query string", () => {
    const withQuery = { ...spotify, url: `${spotify.url}?si=1` };

    expect(getListenUrl(podcast({ sources: [withQuery] }))?.url).toBe(
      "https://open.spotify.com/episode/abc?si=1&t=2690",
    );
  });

  it("falls back to RTL+ without a timecode", () => {
    expect(getListenUrl(podcast({ sources: [rtl] }))).toEqual({
      url: "https://plus.rtl.de/podcast/x",
      provider: "rtl",
      type: "audio",
    });
  });

  it("falls back to the first source of an unknown provider", () => {
    const unknown = { url: "https://example.com/ep", type: "video" as const };

    expect(getListenUrl(podcast({ sources: [unknown] }))).toEqual({
      url: "https://example.com/ep",
      provider: undefined,
      type: "video",
    });
  });

  it("returns undefined when there is no source", () => {
    expect(getListenUrl(podcast({ sources: [] }))).toBeUndefined();
  });
});

describe("fciGroupLabel", () => {
  it("labels every FCI group", () => {
    expect(fciGroupLabel(1)).toEqual({
      roman: "I",
      short: "Hütehunde",
      long: "Hüte- und Treibhunde",
    });
    expect(fciGroupLabel(2)?.short).toBe("Molosser");
    expect(fciGroupLabel(8)?.long).toBe("Apportier-, Stöber- und Wasserhunde");
    expect(fciGroupLabel(10)).toEqual({
      roman: "X",
      short: "Windhunde",
      long: "Windhunde",
    });
  });

  it("returns undefined outside 1–10", () => {
    expect(fciGroupLabel(0)).toBeUndefined();
    expect(fciGroupLabel(11)).toBeUndefined();
  });
});

describe("breedSlug", () => {
  it("kebab-cases the internal name", () => {
    expect(breedSlug(breed())).toBe("border-collie");
  });

  it("uses the group name for grouped breeds and transliterates umlauts", () => {
    expect(
      breedSlug(
        breed({
          details: {
            internal: "grey_norwegian_elkhound",
            public: ["Grauer Elchhund"],
            groupAs: "Norwegischer Elchhund",
          },
        }),
      ),
    ).toBe("norwegischer-elchhund");
    expect(
      breedSlug(
        breed({ details: { internal: "Großer Münsterländer", public: [""] } }),
      ),
    ).toBe("grosser-muensterlaender");
  });
});

describe("assignSlugs", () => {
  it("appends the id to later breeds whose slug is taken", () => {
    const [first, second] = assignSlugs([
      breed({ id: "ab12" }),
      breed({ id: "cd34" }),
    ]);

    expect(first.slug).toBe("border-collie");
    expect(second.slug).toBe("border-collie-cd34");
  });
});

describe("toDisplayBreeds with the real dataset", () => {
  const raw: Breed[] = JSON.parse(
    readFileSync(join(__dirname, "../../../public/data/breeds.json"), "utf8"),
  ).breeds;
  const display = toDisplayBreeds(raw);

  it("merges grouped breeds into one display breed per group", () => {
    const groups = new Set(
      raw.filter((b) => b.details.groupAs).map((b) => b.details.groupAs),
    );
    const singles = raw.filter((b) => !b.details.groupAs).length;

    expect(display).toHaveLength(singles + groups.size);
  });

  it("gives every display breed a unique slug and a 4-character id", () => {
    const slugs = display.map((b) => b.slug);

    expect(new Set(slugs).size).toBe(display.length);
    expect(slugs).toContain("border-collie");
    display.forEach((b) => {
      expect(String(b.id)).toMatch(/^[a-z0-9]{4}$/);
      expect(b.originalId).toBeDefined();
    });
  });
});

describe("getIllustrations", () => {
  it("points a single breed to its folder by original id", () => {
    const [display] = toDisplayBreeds([breed()]);

    expect(getIllustrations(display)).toEqual([
      {
        thumbnail:
          "/rasseportrait/illustrations/breeds/297/illustration_thumbnail.jpeg",
        full: "/rasseportrait/illustrations/breeds/297/illustration.jpeg",
        alt: "Border Collie",
        variantName: undefined,
      },
    ]);
  });

  it("returns one illustration per variant", () => {
    const [display] = toDisplayBreeds([
      breed({
        id: 172,
        details: {
          internal: "poodle",
          public: ["Pudel"],
          variants: [
            { internal: "standard", public: "Großpudel" },
            { internal: "toy", public: "Toy-Pudel" },
          ],
        },
      }),
    ]);

    expect(getIllustrations(display)).toEqual([
      {
        thumbnail:
          "/rasseportrait/illustrations/breeds/172/illustration_standard_thumbnail.jpeg",
        full: "/rasseportrait/illustrations/breeds/172/illustration_standard.jpeg",
        alt: "Pudel, Großpudel",
        variantName: "Großpudel",
      },
      {
        thumbnail:
          "/rasseportrait/illustrations/breeds/172/illustration_toy_thumbnail.jpeg",
        full: "/rasseportrait/illustrations/breeds/172/illustration_toy.jpeg",
        alt: "Pudel, Toy-Pudel",
        variantName: "Toy-Pudel",
      },
    ]);
  });

  it("uses each member's FCI folder for grouped breeds", () => {
    const [corgi] = toDisplayBreeds([
      breed({
        id: 38,
        classification: { fci: { group: 1, section: 1, standardNumber: 38 } },
        details: {
          internal: "corgi_cardigan",
          public: ["Welsh Corgi Cardigan"],
          groupAs: "Corgi",
          variants: [{ internal: "cardigan", public: "Welsh Corgi Cardigan" }],
        },
      }),
      breed({
        id: 89,
        classification: { fci: { group: 5, section: 7, standardNumber: 89 } },
        details: {
          internal: "podenco_ibicenco",
          public: ["Podenco Ibicenco"],
          groupAs: "Corgi",
        },
      }),
    ]);

    expect(
      getIllustrations(corgi).map(({ thumbnail, alt }) => [thumbnail, alt]),
    ).toEqual([
      [
        "/rasseportrait/illustrations/breeds/38/illustration_cardigan_thumbnail.jpeg",
        "Corgi, Welsh Corgi Cardigan",
      ],
      [
        "/rasseportrait/illustrations/breeds/89/illustration_podenco_ibicenco_thumbnail.jpeg",
        "Corgi, Podenco Ibicenco",
      ],
    ]);
  });
});

describe("getNewestPortraitBreed", () => {
  it("picks the breed whose portrait aired last", () => {
    const older = breed({ id: 1, podcast: [podcast()] });
    const newest = breed({
      id: 2,
      podcast: [
        podcast({ meta: { ...podcast().meta, airDate: "2026-06-04" } }),
      ],
    });
    const anecdoteOnly = breed({
      id: 3,
      podcast: [
        podcast({
          meta: { ...podcast().meta, internal: "other", airDate: "2026-09-01" },
        }),
      ],
    });

    expect(getNewestPortraitBreed([older, anecdoteOnly, newest])).toBe(newest);
  });

  it("returns undefined for an empty list", () => {
    expect(getNewestPortraitBreed([])).toBeUndefined();
  });
});
