import type { Breed } from "../../../types/breed";

export default {
  id: 50,
  details: {
    internal: "newfoundlander",
    public: ["Neufundländer", "Newfoundland"],
  },
  classification: {
    fci: {
      group: 2,
      section: 2,
      standardNumber: 50,
    },
  },
  podcast: [
    {
      number: 226,
      episode: "Der große Leberwursttest",
      sources: [
        {
          url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/226-der-grosse-leberwursttest-t07fuh4dtuhg9",
          type: "audio",
        },
      ],
      meta: {
        internal: "portrait",
        public: "Rasseportrait",
        timecode: 2323,
        airDate: "2025-09-11",
        isGuessable: true,
        isGuessedCorrectly: false,
        guessedBy: "mr",
      },
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Neufundländer",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/NEUFUNDLANDER-50.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/neufundlaender",
    },
    {
      name: "Martin Rütter",
      url: "https://www.martinruetter.com/rassekunde/neufundlaender",
    },
  ],
} satisfies Breed;
