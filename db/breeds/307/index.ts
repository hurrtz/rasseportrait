import type { Breed } from "../../../types/breed";

export default {
  id: 307,
  details: {
    internal: "azawakh",
    public: ["Azawakh", "Idi", "Osca", "Tuareg-Windhund"],
  },
  classification: {
    fci: {
      group: 10,
      section: 3,
      standardNumber: 307,
    },
  },
  podcast: [
    {
      number: 183,
      episode: "Schiebeflöte",
      sources: [
        {
          url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/183-schiebefloete-z8ui95rb5t0rv",
          type: "audio",
        },
      ],
      meta: {
        internal: "portrait",
        public: "Rasseportrait",
        timecode: 1125,
        airDate: "2024-09-12",
        isGuessable: true,
        isGuessedCorrectly: true,
        guessedBy: "mr",
      },
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Azawakh",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/AZAWAKH-307.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/azawakh",
    },
  ],
} satisfies Breed;
