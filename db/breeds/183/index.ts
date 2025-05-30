import type { Breed } from "../../../types/breed";

export default {
  id: 183,
  details: {
    internal: "miniature_schnauzer",
    public: ["Zwergschnauzer"],
    groupAs: "schnauzer",
  },
  classification: {
    fci: {
      group: 2,
      section: 1,
      standardNumber: 183,
    },
  },
  podcast: [
    {
      number: 169,
      episode: "Wichtige Updates",
      sources: [
        {
          url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/169-wichtige-updates-jbd8afdfpby1s",
          type: "audio",
        },
      ],
      meta: {
        internal: "portrait",
        public: "Rasseportrait",
        timecode: 2290,
        airDate: "2024-06-06",
        isGuessable: true,
        isGuessedCorrectly: true,
        guessedBy: "mr",
      },
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Schnauzer",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/ZWERGSCHNAUZER-183.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/zwergschnauzer",
    },
  ],
} as Breed;
