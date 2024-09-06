import type { Breed } from "../../../types/breed";

const breed: Breed = {
  id: "cirneco_dell_etna",
  names: ["Cirneco dell'Etna"],
  fci: {
    group: 5,
    section: 7,
    standardNumber: 199,
  },
  podcast: [
    {
      number: 110,
      episode: "Bulette & Bier",
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/110-bulette-bier-evkbrps47ac2f",
      timecode: 1555,
      airDateTimestamp: 1681952400000,
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Cirneco_dell%E2%80%99Etna",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/CIRNECO-DELL-ETNA-199.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/cirneco-delletna",
    },
  ],
};

export default breed;
