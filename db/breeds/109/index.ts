import type { Breed } from "../../../types/breed";

export default {
  id: 109,
  details: {
    internal: "clumber_spaniel",
    public: ["Clumber Spaniel"],
  },
  classification: {
    fci: {
      group: 8,
      section: 2,
      standardNumber: 109,
    },
  },
  podcast: [
    {
      number: 200,
      episode: "Die Fliege an der Wand",
      sources: [
        {
          url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/200-die-fliege-an-der-wand-n3r0xgvkrzorr",
          type: "audio",
        },
      ],
      meta: {
        internal: "portrait",
        public: "Rasseportrait",
        timecode: 2457,
        airDate: "2025-01-09",
        isGuessable: true,
        isGuessedCorrectly: false,
        guessedBy: "mr",
      },
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Clumber_Spaniel",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/CLUMBER-SPANIEL-109.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/clumber-spaniel",
    },
  ],
} as Breed;
