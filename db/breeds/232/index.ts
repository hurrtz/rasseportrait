import type { Breed } from "../../../types/breed";

export default {
  id: 232,
  details: {
    internal: "german_roughhaired_pointer",
    public: ["Deutsch Stichelhaar"],
  },
  classification: {
    fci: {
      group: 7,
      section: 1,
      standardNumber: 232,
    },
  },
  podcast: [
    {
      number: 163,
      episode: "Gute Reflexe, schlechte Reflexe",
      sources: [
        {
          url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/163-gute-reflexe-schlechte-reflexe-pbp0znipifura",
          type: "audio",
        },
      ],
      meta: {
        internal: "portrait",
        public: "Rasseportrait",
        timecode: 2947,
        airDate: "2024-04-25",
        isGuessable: true,
        isGuessedCorrectly: true,
        guessedBy: "mr",
      },
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Deutsch_Stichelhaar",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/DEUTSCH-STICHELHAAR-232.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/deutsch-stichelhaar",
    },
  ],
} as Breed;
