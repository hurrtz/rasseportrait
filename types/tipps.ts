export type Author = "Martin Rütter" | "Katharina Adick";

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
