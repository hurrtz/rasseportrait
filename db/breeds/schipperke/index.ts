import type { Breed } from "../../../types/breed";

const breed: Breed = {
  id: "schipperke",
  names: ["Schipperke"],
  wasGuessedCorrectlyInPodcast: false,
  fci: {
    group: 1,
    section: 1,
    standardNumber: 83,
  },
  podcast: [
    {
      number: 222,
      episode: "Der schwere Duft von Ryanair",
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/222-der-schwere-duft-von-ryanair-82gd9hzof390x",
      timecode: 1822,
      airDate: "2025-06-19",
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Schipperke",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/SCHIPPERKE-83.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/schipperke",
    },
  ],
};

export default breed;
