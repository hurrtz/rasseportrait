import type { Breed } from "../../../types/breed";

const breed: Breed = {
  id: "wetterhoun",
  names: ["Wetterhoun", "Friesischer Wasserhund"],
  wasGuessedCorrectlyInPodcast: true,
  fci: {
    group: 8,
    section: 3,
    standardNumber: 221,
  },
  podcast: [
    {
      number: 133,
      episode: "Ein bisschen Paloma",
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/133-ein-bisschen-paloma-189d70agws5z3",
      timecode: 2628,
      airDate: "2023-09-28",
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
