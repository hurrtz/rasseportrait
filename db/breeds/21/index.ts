import type { Breed } from "../../../types/breed";

export default {
  id: 21,
  details: {
    internal: "grand_gascon_saintongeois",
    public: ["Grand Gascon Saintongeois"],
  },
  classification: {
    fci: {
      group: 6,
      section: 1,
      standardNumber: 21,
    },
  },
  podcast: [
    {
      number: 129,
      episode: "Einfach mal sitzen",
      sources: [
        {
          url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/129-einfach-mal-sitzen-dbc2cl161xydt",
          type: "audio",
        },
      ],
      meta: {
        internal: "portrait",
        public: "Rasseportrait",
        timecode: 1132,
        airDate: "2023-08-31",
        isGuessable: true,
        isGuessedCorrectly: false,
        guessedBy: "mr",
      },
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Grand_Gascon_Saintongeois",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/GASCON-SAINTONGEOIS-21.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/gascon-saintongeois",
    },
  ],
} as Breed;
