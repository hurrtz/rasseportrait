import type { Breed } from "../../../types/breed";

export default {
  id: 48,
  details: {
    internal: "karelian_bear_dog",
    public: [
      "Karelischer Bärenhund",
      "Karjalankarhukoira",
      "Björnhund",
      "Hund der Zyrianer",
    ],
  },
  classification: {
    fci: {
      group: 5,
      section: 2,
      standardNumber: 48,
    },
  },
  podcast: [
    {
      number: 132,
      episode: "Funkstille, Fliegen & Hochstaplersyndrom",
      sources: [
        {
          url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/132-funkstille-fliegen-hochstaplersyndrom-vw7v85dyj5wp9",
          type: "audio",
        },
      ],
      meta: {
        internal: "portrait",
        public: "Rasseportrait",
        timecode: 2264,
        airDate: "2023-09-21",
        isGuessable: true,
        isGuessedCorrectly: true,
        guessedBy: "mr",
      },
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Karelischer_B%C3%A4renhund",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/KARELISCHER-BARENHUND-48.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/karelischer-baerenhund",
    },
  ],
} as Breed;
