import type { Breed } from "../../types/breed";

const breed: Breed = {
  id: "shetland_sheepdog",
  names: ["Shetland Sheepdog"],
  fci: {
    group: 1,
    section: 1,
    standardNumber: 88,
  },
  podcast: [
    {
      number: 153,
      episode: "Parlamentskreis Hund",
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/153-parlamentskreis-hund-yijtj5yrhqgo1",
      timecode: 2232,
      airDate: "2024-02-15",
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
