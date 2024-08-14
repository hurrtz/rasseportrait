import type { Breed, FCI } from "../../../types/breed";

const fci: FCI = {
  group: 1,
  section: 1,
  standardNumber: 88,
};

const { standardNumber: id } = fci;

const breed: Breed = {
  id,
  names: ["Shetland Sheepdog"],
  fci,
  podcast: [
    {
      number: 153,
      episode: "Parlamentskreis Hund",
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/153-parlamentskreis-hund-yijtj5yrhqgo1",
      timecode: 2232,
      airDateTimestamp: 1707958800000,
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Shetland_Sheepdog",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/SHETLAND-SHEEPDOG-88.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/sheltie-shetland-sheepdog",
    },
  ],
};

export default breed;
