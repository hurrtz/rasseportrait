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
}

export type TippsList = Tipps[];
