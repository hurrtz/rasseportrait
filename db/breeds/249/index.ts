import type { Breed } from "../../../types/breed";

export default {
  id: 249,
  details: {
    internal: "majorcan_mastiff",
    public: [
      "Ca de Bou",
      "Perro dogo mallorquín",
      "Perro de Presa Mallorquín",
      "Mallorca-Dogge",
      "Mallorca Mastiff",
    ],
  },
  classification: {
    fci: {
      group: 2,
      section: 2,
      standardNumber: 249,
    },
  },
  podcast: [
    {
      number: 167,
      episode: "Ameisen-Waschstraße",
      sources: [
        {
          url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/167-ameisen-waschstrasse-sctwq1mdogjpv",
          type: "audio",
        },
      ],
      meta: {
        internal: "portrait",
        public: "Rasseportrait",
        timecode: 2572,
        airDate: "2024-05-23",
        isGuessable: true,
        isGuessedCorrectly: true,
        guessedBy: "mr",
      },
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Ca_de_Bou",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/MALLORCA-DOGGE-249.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/perro-dogo-mallorquin",
    },
  ],
} satisfies Breed;
