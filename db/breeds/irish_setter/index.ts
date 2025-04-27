import type { Breed } from "../../../types/breed";

const breed: Breed = {
  id: "irish_setter",
  names: ["Irish Red Setter"],
  wasGuessedCorrectlyInPodcast: true,
  fci: {
    group: 7,
    section: 2,
    standardNumber: 120,
  },
  podcast: [
    {
      number: 213,
      episode: "Der Schattenwolf",
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/213-der-schattenwolf-g3qxe03xyc2na",
      timecode: 2045,
      airDate: "2025-04-11",
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Irish_Red_Setter",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/IRISCHER-ROTER-SETTER-120.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/irish-red-setter",
    },
  ],
};

export default breed;
