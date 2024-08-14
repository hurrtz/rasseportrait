import type { Breed, FCI } from "../../../types/breed";

const fci: FCI = {
  group: 2,
  section: 2,
  standardNumber: 368,
};

const { standardNumber: id } = fci;

const breed: Breed = {
  id,
  names: [
    "Transmontano-Hirtenhund",
    "Cão de Gado Trasmontano",
    "Transmontano Mastiff",
  ],
  fci,
  podcast: [
    {
      number: 164,
      episode: "Sofafolge",
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/164-sofafolge-k911jyp1xsjm0",
      timecode: 1917,
      airDateTimestamp: 1714611600000,
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Transmontano-Hirtenhund",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/TRANSMONTANO-HIRTENHUND-368.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/cao-de-gado-transmontano",
    },
  ],
};

export default breed;
