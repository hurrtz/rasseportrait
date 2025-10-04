import type { Breed } from "../../../types/breed";

export default {
  id: 120,
  details: {
    internal: "irish_setter",
    public: ["Irish Red Setter"],
  },
  classification: {
    fci: {
      group: 7,
      section: 2,
      standardNumber: 120,
    },
  },
  podcast: [
    {
      number: 213,
      episode: "Der Schattenwolf",
      sources: [
        {
          url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/213-der-schattenwolf-g3qxe03xyc2na",
          type: "audio",
        },
      ],
      meta: {
        internal: "portrait",
        public: "Rasseportrait",
        timecode: 2045,
        airDate: "2025-04-11",
        isGuessable: true,
        isGuessedCorrectly: true,
        guessedBy: "mr",
      },
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Irish_Red_Setter",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/IRISCHER-ROTER-SETTER-120.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/irish-red-setter",
    },
    {
      name: "Martin Rütter",
      url: "https://www.martinruetter.com/rassekunde/irish-red-setter",
    },
  ],
} as Breed;
