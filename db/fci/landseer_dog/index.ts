import type { Breed } from "../../../types/breed";

const breed: Breed = {
  id: "landseer_dog",
  names: ["Landseer"],
  fci: {
    group: 2,
    section: 2,
    standardNumber: 226,
  },
  podcast: [
    {
      number: 46,
      episode: "Landseer, Seepferdchen und der Hundeprofi in Seenot",
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/46-landseer-seepferdchen-und-der-hundeprofi-in-seenot-7zqr09d3n0k4c",
      timecode: 1820,
      airDateTimestamp: 1643245200000,
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Landseer_(Hunderasse)",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/LANDSEER-EUROPAISCH-KONTINENTALER-TYP-226.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/landseer",
    },
  ],
};

export default breed;
