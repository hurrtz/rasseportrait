import type { Podcast, EnrichedPodcast, FurtherReading } from "./general";

export interface FCI {
  group: number;
  section: number;
  standardNumber: number;
}

export interface Variant {
  id: string;
  names: string[];
  fci?: FCI;
  furtherReading?: FurtherReading[];
}

export interface Breed {
  id: number | string;
  isOfficiallyPresented?: boolean;
  wasGuessedCorrectlyInPodcast: boolean | "not_applicable";
  wasGuessedCorrectlyInPodcastBy?: "martin" | "katharina";
  names: string[];
  variants?: Variant[];
  fci?: FCI;
  podcast: Podcast[];
  furtherReading: FurtherReading[];
  recognitions?: string[];
  startShowingFromTimestamp?: number;
}

export interface EnrichedBreed extends Omit<Breed, "image" | "podcast"> {
  image: string;
  podcast: EnrichedPodcast[];
}

export type BreedIdentifier =
  | {
      id: string | number;
      variantName?: string;
    }
  | undefined;
