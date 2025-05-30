import type { Breed } from "../../../types/breed";

export default {
  id: 77,
  details: {
    internal: "papillon",
    public: [
      "Kontinentaler Zwergspaniel",
      "Papillon",
      "Phalène",
      "Schmetterlingshündchen",
    ],
  },
  classification: {
    fci: {
      group: 9,
      section: 9,
      standardNumber: 77,
    },
  },
  podcast: [
    {
      number: 189,
      episode: "Die 30.000 Euro Frage",
      sources: [
        {
          url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/189-die-30000-euro-frage-8uwhvk42tx8h8",
          type: "audio",
        },
      ],
      meta: {
        internal: "portrait",
        public: "Rasseportrait",
        timecode: 3010,
        airDate: "2024-10-24",
        isGuessable: true,
        isGuessedCorrectly: true,
        guessedBy: "mr",
      },
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Kontinentaler_Zwergspaniel",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/KONTINENTALER-ZWERGSPANIEL-77.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/papillon",
    },
    {
      name: "Martin Rütter",
      url: "https://www.martinruetter.com/rassekunde/kontinentaler-zwergspaniel",
    },
  ],
} as Breed;
