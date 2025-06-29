import type { Breed } from "../../../types/breed";

export default {
  id: 346,
  details: {
    internal: "canary_mastiff",
    public: ["Presa Canario", "Kanarische Dogge", "Dogo Canario"],
  },
  classification: {
    fci: {
      group: 2,
      section: 2,
      standardNumber: 346,
    },
  },
  podcast: [
    {
      number: 141,
      episode: "Giftwarnung, Zeckenspray & Hühner-Hacks",
      sources: [
        {
          url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/141-giftwarnung-zeckenspray-huehner-hacks-gds039ru762p9",
          type: "audio",
        },
      ],
      meta: {
        internal: "portrait",
        public: "Rasseportrait",
        timecode: 2594,
        airDate: "2023-11-23",
        isGuessable: true,
        isGuessedCorrectly: true,
        guessedBy: "mr",
      },
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Presa_Canario",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/PRESA-CANARIO-346.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/presa-canario",
    },
  ],
} satisfies Breed;
