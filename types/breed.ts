export interface FCI {
  group: number;
  section: number;
  standardNumber: number;
}

interface Variant {
  names: string[];
  fci?: FCI;
  image: string;
}

interface Podcast {
  episode: string;
  url: string;
  timecode: number;
}

interface FurtherReading {
  name: string;
  url: string;
}

export interface Breed {
  names: string[];
  variants?: Variant[];
  image?: string;
  fci?: FCI;
  podcast: Podcast[];
  furtherReading: FurtherReading[];
}
