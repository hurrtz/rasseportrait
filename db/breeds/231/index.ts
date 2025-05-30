import type { Breed } from "../../../types/breed";

export default {
  id: 231,
  details: {
    internal: "tibetan_spaniel",
    public: [
      "Tibet-Spaniel",
      "Tibetan Spaniel",
      "Épagneul tibétain",
      "Spaniel tibetano",
      "Spaniel del Tibet",
    ],
  },
  classification: {
    fci: {
      group: 9,
      section: 5,
      standardNumber: 231,
    },
  },
  podcast: [
    {
      number: "Summer Edition #6",
      episode: "Junger Mann zum Mitreisen gesucht!",
      sources: [
        {
          url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/summer-edition-6-junger-mann-zum-mitreisen-gesucht-oxv9o45d8w0ad",
          type: "audio",
        },
      ],
      meta: {
        internal: "portrait",
        public: "Rasseportrait",
        timecode: 1089,
        airDate: "2024-08-01",
        isGuessable: true,
        isGuessedCorrectly: false,
        guessedBy: "mr",
      },
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Tibet-Spaniel",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/TIBET-SPANIEL-231.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/tibet-spaniel",
    },
  ],
} as Breed;
