export type Author = string;

interface Tipps {
  title: string;
  subheader: string;
  tipps: {
    tipp: string[];
    author: Author;
  }[];
  url: string;
  startShowingFromTimestamp?: number;
  furtherReading?: {
    name: string;
    url: string;
  }[];
}

export type TippsList = Tipps[];
