import type { Breed, Podcast } from "types/breed";
import { mergeGroupedBreeds } from "~/pages/rasseportrait/utils";
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
