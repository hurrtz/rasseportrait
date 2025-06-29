import type { Breed } from "../../../types/breed";

export default {
  id: 192,
  details: {
    internal: "kromfohrlaender",
    public: ["Kromfohrländer"],
    variants: [
      {
        internal: "wire",
        public: "Rauhhaar",
      },
      {
        internal: "smooth",
        public: "Glatthaar",
      },
    ],
  },
  classification: {
    fci: {
      group: 9,
      section: 10,
      standardNumber: 192,
    },
  },
  podcast: [
    {
      number: 93,
      episode: "Ebay, Aquadom & Frohe Weihnachten",
      sources: [
        {
          url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/93-ebay-aquadom-frohe-weihnachten-vunq6bh8makya",
          type: "audio",
        },
      ],
      meta: {
        internal: "portrait",
        public: "Rasseportrait",
        timecode: 1733,
        airDate: "2022-12-22",
        isGuessable: true,
        isGuessedCorrectly: true,
        guessedBy: "mr",
      },
    },
    {
      number: "Summer Edition #10",
      episode: "Stabile Typen",
      sources: [
        {
          url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/summer-edition-10-stabile-typen-4s4s3dlg5jjyi",
          type: "audio",
        },
      ],
      meta: {
        internal: "personal_anecdote",
        public: "Persönliche Anekdote",
        timecode: 1106,
        airDate: "2024-08-29",
        isGuessable: undefined,
        isGuessedCorrectly: undefined,
        guessedBy: undefined,
      },
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Kromfohrl%C3%A4nder",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/KROMFOHRLANDER-192.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/kromfohrlaender",
    },
    {
      name: "Martin Rütter",
      url: "https://www.martinruetter.com/rassekunde/kromfohrlaender",
    },
  ],
} as Breed;
