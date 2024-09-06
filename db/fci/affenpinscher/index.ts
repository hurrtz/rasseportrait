import type { Breed } from "../../../types/breed";

const breed: Breed = {
  id: "affenpinscher",
  names: ["Affenpinscher"],
  fci: {
    group: 2,
    section: 1,
    standardNumber: 186,
  },
  podcast: [
    {
      number: 65,
      episode:
        "Ein Keks mit Folgen, Körpersprache für Hunde & schöne Geschenke",
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/65-ein-keks-mit-folgen-koerpersprache-fuer-hunde-schoene-geschenke-362zgzakgwpmb",
      timecode: 2909,
      airDateTimestamp: 1654736400000,
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Affenpinscher",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/AFFENPINSCHER-186.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/affenpinscher",
    },
  ],
};

export default breed;
