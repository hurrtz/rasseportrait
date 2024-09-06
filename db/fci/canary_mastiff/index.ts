import type { Breed } from "../../../types/breed";

const breed: Breed = {
  id: "canary_mastiff",
  names: ["Presa Canario", "Kanarische Dogge", "Dogo Canario"],
  fci: {
    group: 2,
    section: 2,
    standardNumber: 346,
  },
  podcast: [
    {
      number: 141,
      episode: "Giftwarnung, Zeckenspray & Hühner-Hacks",
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/141-giftwarnung-zeckenspray-huehner-hacks-gds039ru762p9",
      timecode: 2594,
      airDateTimestamp: 1700701200000,
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
};

export default breed;
