import type { Breed, FCI } from "../../../types/breed";

const fci: FCI = {
  group: 8,
  section: 3,
  standardNumber: 221,
};

const { standardNumber: id } = fci;

const breed: Breed = {
  id,
  names: ["Friesischer Wasserhund", "Wetterhoun"],
  fci,
  podcast: [
    {
      number: 133,
      episode: "Ein bisschen Paloma",
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/133-ein-bisschen-paloma-189d70agws5z3",
      timecode: 2628,
      airDateTimestamp: 1695862800000,
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Wetterhoun",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/FRIESISCHER-WASSERHUND-221.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/wetterhoun",
    },
  ],
};

export default breed;