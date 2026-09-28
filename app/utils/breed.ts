import type { Breed, FurtherReading, Podcast } from "types/breed";
import { mergeGroupedBreeds } from "~/pages/rasseportrait/utils";
import { BASE_PATH } from "~/constants";
import { generateBreedHashes } from "./generateBreedHash";

/** The breed's portrait appearance, else its first appearance */
export const getPrimaryPortrait = (
  breed: Pick<Breed, "podcast">,
): Podcast | undefined =>
  breed.podcast.find(({ meta }) => meta.internal === "portrait") ??
  breed.podcast[0];

export interface ListenTarget {
  url: string;
  provider: "spotify" | "rtl" | undefined;
  type: "audio" | "video";
}

/**
 * Where a play button leads: Spotify first (it supports jumping to the
 * timecode), else RTL+, else whatever source comes first.
 */
export const getListenUrl = (podcast: Podcast): ListenTarget | undefined => {
  const source =
    podcast.sources.find(({ provider }) => provider === "spotify") ??
    podcast.sources.find(({ provider }) => provider === "rtl") ??
    podcast.sources[0];

  if (!source) return undefined;

  const url =
    source.provider === "spotify"
      ? `${source.url}${source.url.includes("?") ? "&" : "?"}t=${podcast.meta.timecode}`
      : source.url;

  return { url, provider: source.provider, type: source.type };
};

const PROVIDER_NAMES = { spotify: "Spotify", rtl: "RTL+" } as const;

/** "Spotify" / "RTL+"; unknown providers are just "Podcast" */
export const providerName = (provider: ListenTarget["provider"]) =>
  provider ? PROVIDER_NAMES[provider] : "Podcast";

export interface FciGroupLabel {
  roman: string;
  short: string;
  long: string;
}

const FCI_GROUPS: FciGroupLabel[] = [
  { roman: "I", short: "Hütehunde", long: "Hüte- und Treibhunde" },
  {
    roman: "II",
    short: "Molosser",
    long: "Pinscher, Schnauzer, Molosser, Sennenhunde",
  },
  { roman: "III", short: "Terrier", long: "Terrier" },
  { roman: "IV", short: "Dachshunde", long: "Dachshunde" },
  { roman: "V", short: "Spitze", long: "Spitze und Hunde vom Urtyp" },
  { roman: "VI", short: "Laufhunde", long: "Laufhunde und Schweißhunde" },
  { roman: "VII", short: "Vorstehhunde", long: "Vorstehhunde" },
  {
    roman: "VIII",
    short: "Apportierhunde",
    long: "Apportier-, Stöber- und Wasserhunde",
  },
  {
    roman: "IX",
    short: "Begleithunde",
    long: "Gesellschafts- und Begleithunde",
  },
  { roman: "X", short: "Windhunde", long: "Windhunde" },
];

/** FCI group 1–10 → roman numeral and German names */
export const fciGroupLabel = (group: number): FciGroupLabel | undefined =>
  FCI_GROUPS[group - 1];

const TRANSLITERATION: Record<string, string> = {
  ä: "ae",
  ö: "oe",
  ü: "ue",
  ß: "ss",
};

/** URL slug: kebab-case of the group name or internal name */
export const breedSlug = (breed: Pick<Breed, "details">): string =>
  (breed.details.groupAs ?? breed.details.internal)
    .toLowerCase()
    .replace(/[äöüß]/g, (char) => TRANSLITERATION[char])
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

/** Sets `slug` on every breed; a taken slug gets the breed's id appended */
export const assignSlugs = (breeds: Breed[]): Breed[] => {
  const taken = new Set<string>();

  return breeds.map((breed) => {
    const base = breedSlug(breed);
    const slug = taken.has(base) ? `${base}-${breed.id}` : base;
    taken.add(slug);
    return { ...breed, slug };
  });
};

/**
 * Raw breeds (one per data file) → the breeds the app shows: grouped breeds
 * merged into one, ids hashed to 4 characters (the original id is kept for
 * asset paths), and a unique slug for the detail page URL.
 */
export const toDisplayBreeds = (rawBreeds: Breed[]): Breed[] => {
  const merged = [
    ...rawBreeds.filter((breed) => !breed.details.groupAs),
    ...mergeGroupedBreeds(rawBreeds),
  ];
  const hashes = generateBreedHashes(merged);

  return assignSlugs(
    merged.map((breed) => ({
      ...breed,
      originalId: breed.id,
      id: hashes.get(breed.id) ?? breed.id,
    })),
  );
};

export interface Illustration {
  thumbnail: string;
  full: string;
  alt: string;
  variantName: string | undefined;
}

const illustration = (
  folder: string | number,
  suffix: string,
  alt: string,
  variantName?: string,
): Illustration => {
  const base = `${BASE_PATH}illustrations/breeds/${folder}/illustration${suffix}`;
  return {
    thumbnail: `${base}_thumbnail.jpeg`,
    full: `${base}.jpeg`,
    alt,
    variantName,
  };
};

/**
 * The display breed's illustrations, one per variant (else one). Grouped
 * breeds keep each member's files in the member's FCI folder; everything
 * else lives in the folder named after the original breed id.
 */
export const getIllustrations = (breed: Breed): Illustration[] => {
  const name = breed.details.public[0];
  const folder = breed.originalId ?? breed.id;
  const { variants } = breed.details;

  if (!variants?.length) return [illustration(folder, "", name)];

  return variants.map((variant) =>
    illustration(
      breed.details.isGrouped
        ? (variant.fci?.standardNumber ?? folder)
        : folder,
      `_${variant.internal}`,
      `${name}, ${variant.public}`,
      variant.public,
    ),
  );
};

const portraitAirDate = (breed: Breed) =>
  breed.podcast.find(({ meta }) => meta.internal === "portrait")?.meta.airDate;

/** The breed with the most recently aired portrait (ISO dates sort as text) */
export const getNewestPortraitBreed = (breeds: Breed[]): Breed | undefined =>
  breeds.reduce<Breed | undefined>((newest, breed) => {
    const date = portraitAirDate(breed);
    if (!date) return newest;
    const newestDate = newest && portraitAirDate(newest);
    return !newestDate || date > newestDate ? breed : newest;
  }, undefined);

export interface BreedView {
  name: string;
  /** Names of all variants; empty for breeds without variants */
  variants: string[];
  variantName: string | undefined;
  illustration: Illustration;
  primary: Podcast | undefined;
  /** Further appearances besides the primary one */
  others: Podcast[];
  listen: ListenTarget | undefined;
  fci: Breed["classification"]["fci"];
  group: FciGroupLabel | undefined;
  links: FurtherReading[];
}

/**
 * What the breed page shows for one variant: the variant's own episodes,
 * FCI data and links win over the breed's, links are joined.
 */
export const getBreedView = (breed: Breed, variantIndex: number): BreedView => {
  const variants = breed.details.variants ?? [];
  const variant = variants[variantIndex];
  const podcast = variant?.podcast ?? breed.podcast;
  const primary = getPrimaryPortrait({ podcast });
  const fci = variant?.fci ?? breed.classification.fci;
  const illustrations = getIllustrations(breed);
  const links = [...breed.furtherReading, ...(variant?.furtherReading ?? [])];

  return {
    name: breed.details.public[0],
    variants: variants.map(({ public: name }) => name),
    variantName: variant?.public,
    illustration: illustrations[variantIndex] ?? illustrations[0],
    primary,
    others: podcast.filter((entry) => entry !== primary),
    listen: primary && getListenUrl(primary),
    fci,
    group: fci && fciGroupLabel(fci.group),
    links: links.filter(
      (link, index) => links.findIndex(({ url }) => url === link.url) === index,
    ),
  };
};

const fciGroupOf = (breed: Breed) =>
  breed.classification.fci?.group ??
  breed.details.variants?.find(({ fci }) => fci)?.fci?.group;

/** Up to `limit` other breeds of the FCI group, newest portrait first */
export const getRelatedBreeds = (
  breeds: Breed[],
  breed: Breed,
  group: number,
  limit = 3,
): Breed[] =>
  breeds
    .filter((other) => other.id !== breed.id && fciGroupOf(other) === group)
    .sort((a, b) =>
      (portraitAirDate(b) ?? "").localeCompare(portraitAirDate(a) ?? ""),
    )
    .slice(0, limit);

/** The display breed a raw breed is shown as (its group's breed if grouped) */
export const findDisplayBreed = (
  displayBreeds: Breed[],
  raw: Breed,
): Breed | undefined =>
  displayBreeds.find((breed) =>
    raw.details.groupAs
      ? breed.details.isGrouped &&
        breed.details.internal === raw.details.groupAs
      : breed.originalId === raw.id,
  );
