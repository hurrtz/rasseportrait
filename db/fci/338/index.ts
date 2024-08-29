import type { Breed, FCI } from "../../../types/breed";

const fci: FCI = {
  group: 5,
  section: 7,
  standardNumber: 338,
};

const { standardNumber: id } = fci;

const breed: Breed = {
  id,
  names: ["Thai Ridgeback"],
  fci,
  podcast: [
    {
      number: "Summer Edition #10",
      episode: "Stabile Typen",
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/neue-folge",
      timecode: 1008,
      airDateTimestamp: 1724889600000,
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Thai_Ridgeback",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/THAILAND-RIDGEBACK-338.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/thai-ridgeback-dog",
    },
  ],
};

export default breed;
