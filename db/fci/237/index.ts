import type { Breed, FCI } from "../../../types/breed";

const fci: FCI = {
  group: 5,
  section: 3,
  standardNumber: 237,
};

const { standardNumber: id } = fci;

const breed: Breed = {
  id,
  names: [
    "Norwegischer Buhund",
    "Norsk Buhund",
    "Norwegian Sheppdog",
    "Norwegian Buhund",
    "Buhund norvégien",
  ],
  fci,
  podcast: [
    {
      number: 146,
      episode: "Jahresrückblick (mit Conny Sporrer)",
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/146-jahresrueckblick-mit-conny-sporrer-8m1rnr25r4dam",
      timecode: 2024,
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Norwegischer_Buhund",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/NORWEGISCHER-BUHUND-237.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/norwegischer-buhund",
    },
  ],
};

export default breed;
