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

export interface Podcast {
  number: number | string;
  episode: string;
  url: string;
  timecode: number;
  type?: string;
  airDate: string;
  context?: "Hörerfrage";
}

export interface EnrichedPodcast extends Omit<Podcast, "airDate"> {
  airDate: Date;
}

interface FurtherReading {
  name: string;
  url: string;
}

export interface Breed {
  id: number | string;
  isOfficiallyPresented?: boolean;
  wasGuessedCorrectlyInPodcast?: boolean | "not_applicable";
  image?: any;
  names: string[];
  variants?: Variant[];
  fci?: FCI;
  podcast: Podcast[];
  furtherReading: FurtherReading[];
  recognitions?: string[];
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
