import type { Breed } from "../../types/breed";

const breed: Breed = {
  id: "australian_shepherd",
  names: ["Australian Shepherd", "Australischer Schäferhund"],
  fci: {
    group: 1,
    section: 1,
    standardNumber: 342,
  },
  podcast: [
    {
      number: 182,
      episode: "Blümerle",
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/182-bluemerle-wwapqiaojdbki",
      timecode: 2130,
      airDate: "2024-09-05",
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Australian_Shepherd",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/AUSTRALISCHER-SCHAFERHUND-342.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/australian-shepherd",
    },
  ],
};

export default breed;
