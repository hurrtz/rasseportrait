import type { Breed, FCI } from "../../../types/breed";

const fci: FCI = {
  group: 2,
  section: 2,
  standardNumber: 190,
};

const { standardNumber: id } = fci;

const breed: Breed = {
  id,
  names: ["Hovawart"],
  fci,
  podcast: [
    {
      number: 92,
      episode: "Erfolg gegen den illegalen Welpenhandel!",
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/92-erfolg-gegen-den-illegalen-welpenhandel-htvdavy7w4b2r",
      timecode: 1612,
      airDateTimestamp: 1671066000000,
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Hovawart",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/HOVAWART-190.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/hovawart",
    },
  ],
};

export default breed;