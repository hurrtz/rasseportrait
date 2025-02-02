export type Author = string;

interface Tipps {
  title: string;
  subheader: string;
  tipps: {
    tipp: string[];
    author: Author;
  }[];
  url: string;
}

export type TippsList = Tipps[];
