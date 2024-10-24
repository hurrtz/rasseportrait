import type { Breed } from "../../types/breed";

const breed: Breed = {
  id: "papillon",
  names: [
    "Kontinentaler Zwergspaniel",
    "Papillon",
    "Phalène",
    "Schmetterlingshündchen",
  ],
  fci: {
    group: 9,
    section: 9,
    standardNumber: 77,
  },
  podcast: [
    {
      number: 189,
      episode: "Die 30.000 Euro Frage",
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/189-die-30000-euro-frage-8uwhvk42tx8h8",
      timecode: 3010,
      airDate: "2024-10-24",
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Kontinentaler_Zwergspaniel",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/KONTINENTALER-ZWERGSPANIEL-77.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/papillon",
    },
  ],
};

export default breed;
