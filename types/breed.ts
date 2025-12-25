interface PodcastMeta {
  internal:
    | "portrait"
    | "listener_question"
    | "personal_anecdote"
    | "other"
    | string;
  public: "Rasseportrait" | "Hörerfrage" | "Persönliche Anekdote" | string;
  timecode: number;
  airDate: string;
  type?: "video" | "audio";
  publicDate?: string;
  isGuessable: boolean | undefined;
  isGuessedCorrectly: boolean | undefined;
  guessedBy: "mr" | "ka" | undefined;
}

interface Source {
  url: string;
  type: "video" | "audio";
}

export interface Podcast {
  number: number | string;
  episode: string;
  sources: Source[];
  meta: PodcastMeta;
}

export interface FurtherReading {
  name: string;
  url: string;
}

interface FCI {
  group: number;
  section: number;
  standardNumber: number;
}

export interface Variant {
  internal: string;
  public: string;
  furtherReading?: FurtherReading[];
  fci?: FCI;
  podcast?: Podcast[];
}

interface BreedDetails {
  internal: string;
  public: string[];
  variants?: Variant[];
  groupAs?: string;
  isGrouped?: boolean;
  isOfficiallyPresented?: boolean;
}

export interface Breed {
  id: number | string;
  originalId?: number | string; // Original ID before hashing (for image paths, etc.)
  details: BreedDetails;
  classification: {
    fci: FCI | undefined;
  };
  podcast: Podcast[];
  furtherReading: FurtherReading[];
  recognitions?: string[];
}
