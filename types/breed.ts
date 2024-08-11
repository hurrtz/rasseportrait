export interface FCI {
  group: number;
  section: number;
  standardNumber: number;
}

interface Variant {
  names: string[];
  image: string;
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
  names: string[];
  variants?: Variant[];
  image?: string;
  fci: FCI;
  podcast: Podcast[];
  furtherReading: FurtherReading[];
}

export type BreedIdentifier =
  | {
      id: string | number;
      variantName?: string;
    }
  | undefined;
