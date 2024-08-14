import type { Breed, FCI } from "../../../types/breed";

const fci: FCI = {
  group: 8,
  section: 3,
  standardNumber: 124,
};

const { standardNumber: id } = fci;

const breed: Breed = {
  id,
  names: [
    "Irish Water Spaniel",
    "Irischer Wasserspaniel",
    "Perro de agua irlandés",
    "Épagneul d’eau irlandais",
  ],
  fci,
  podcast: [
    {
      number: 144,
      episode: "Stark wie ein Regenwurm",
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/144-stark-wie-ein-regenwurm-yz5nu29vkfm1o",
      timecode: 2909,
      airDateTimestamp: 1702515600000,
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Irish_Water_Spaniel",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/IRISCHER-WASSERSPANIEL-124.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/irish-water-spaniel",
    },
  ],
};

export default breed;
