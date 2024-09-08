import type { Breed } from "../../types/breed";

const breed: Breed = {
  id: "kuvasz",
  names: ["Kuvasz"],
  fci: {
    group: 1,
    section: 1,
    standardNumber: 54,
  },
  podcast: [
    {
      number: 98,
      episode: "Toadzilla, Tierhandel bei Ebay & Fischloopings",
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/98-toadzilla-tierhandel-bei-ebay-fischloopings-3ajopzugmpayq",
      timecode: 1987,
      airDate: "2023-01-26",
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Kuvasz",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/KUVASZ-54.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/kuvasz",
    },
  ],
};

export default breed;
