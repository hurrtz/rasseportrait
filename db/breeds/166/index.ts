import type { Breed } from "../../../types/breed";

export default {
  id: 166,
  details: {
    internal: "german_shepherd",
    public: ["Deutscher Schäferhund"],
    variants: [
      {
        internal: "short",
        public: "Stockhaar",
        furtherReading: [
          {
            name: "VDH",
            url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/deutscher-schaeferhund-stockhaar",
          },
        ],
      },
      {
        internal: "long",
        public: "Langstockhaar",
        furtherReading: [
          {
            name: "VDH",
            url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/deutscher-schaeferhund-langstockhaar",
          },
        ],
      },
    ],
  },
  classification: {
    fci: {
      group: 1,
      section: 1,
      standardNumber: 166,
    },
  },
  podcast: [
    {
      number: 55,
      episode:
        "Hundetraining aus der Sprühflasche, Maulkorb & der Deutsche Schäferhund",
      sources: [
        {
          url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/55-hundetraining-aus-der-spruehflasche-maulkorb-der-deutsche-schaeferhund-v2o7yjc6mh4we",
          type: "audio",
        },
      ],
      meta: {
        internal: "portrait",
        public: "Rasseportrait",
        timecode: 1222,
        airDate: "2022-03-31",
        isGuessable: false,
        isGuessedCorrectly: undefined,
        guessedBy: "mr",
      },
    },
    {
      number: 215,
      episode: "Viele Fragen uns ja…",
      sources: [
        {
          url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/215-viele-fragen-uns-ja-2qjfbgxlbz4cv",
          type: "audio",
        },
      ],
      meta: {
        internal: "portrait",
        public: "Rasseportrait",
        timecode: 2398,
        airDate: "2025-05-02",
        isGuessable: true,
        isGuessedCorrectly: true,
        guessedBy: "ka",
      },
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Deutscher_Sch%C3%A4ferhund",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/DEUTSCHER-SCHAEFERHUND-166.html",
    },
    {
      name: "Martin Rütter",
      url: "https://www.martinruetter.com/rassekunde/deutscher-schaeferhund",
    },
  ],
} as Breed;
