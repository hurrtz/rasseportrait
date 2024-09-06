import type { Breed } from "../../../types/breed";

const breed: Breed = {
  id: "eurasier",
  names: ["Eurasier"],
  fci: {
    group: 5,
    section: 5,
    standardNumber: 291,
  },
  podcast: [
    {
      number: 60,
      episode: "Lost in the Sauerland, Boris Becker & Hunderassen-Studie",
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/60-lost-in-the-sauerland-boris-becker-hunderassen-studie-qgpee4hjubcmh",
      timecode: 2079,
      airDateTimestamp: 1651712400000,
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Eurasier_(Hunderasse)",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/EURASIER-291.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/eurasier",
    },
  ],
};

export default breed;
