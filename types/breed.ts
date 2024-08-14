export interface FCI {
  group: number;
  section: number;
  standardNumber: number;
}

interface Variant {
  id: string;
  names: string[];
  furtherReading?: FurtherReading[];
}

export interface Podcast {
  number: number | string;
  episode: string;
  url: string;
  timecode: number;
  type?: string;
}

interface FurtherReading {
  name: string;
  url: string;
}

export interface Breed {
  id: number | string;
  image?: any;
  names: string[];
  variants?: Variant[];
  fci: FCI;
  podcast: Podcast[];
  furtherReading: FurtherReading[];
}

export interface EnrichedBreed extends Breed {
  image: string;
}

export type BreedIdentifier =
  | {
      id: string | number;
      variantName?: string;
    }
  | undefined;
