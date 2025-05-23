interface PodcastMeta {
  internal: "portrait" | "listener_question" | "personal_anecdote";
  public: "Rasseportrait" | "Hörerfrage" | "Persönliche Anekdote";
  timecode: number;
  airDate: string;
  publicDate?: string;
  isGuessable: boolean | undefined;
  isGuessedCorrectly: boolean | undefined;
  guessedBy: "mr" | "ka";
}

interface Podcast {
  number: number | string;
  episode: string;
  url: string;
  meta: PodcastMeta;
}

interface FurtherReading {
  name: string;
  url: string;
}

interface FCI {
  group: number;
  section: number;
  standardNumber: number;
}

interface Variant {
  internal: string;
  public: string;
  furtherReading?: FurtherReading[];
}

interface BreedDetails {
  internal: string;
  public: string[];
  variants?: Variant[];
  groupAs?: string;
}

export interface Breed {
  id: number | string;
  details: BreedDetails;
  classification: {
    fci: FCI | undefined;
  };
  podcast: Podcast[];
  furtherReading: FurtherReading[];
  recognitions?: string[];
}
