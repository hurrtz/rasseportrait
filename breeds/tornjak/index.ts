import type { Breed } from "../../types/breed";

const breed: Breed = {
  id: "tornjak",
  names: ["Tornjak", "Bosnisch-herzegowinischer - kroatischer Schäferhund"],
  wasGuessedCorrectlyInPodcast: false,
  fci: {
    group: 2,
    section: 2,
    standardNumber: 355,
  },
  podcast: [
    {
      number: 186,
      episode: "Tierwohl paradox",
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/186-tierwohl-paradox-kpxqn1g2q73xu",
      timecode: 2128,
      airDate: "2024-10-03",
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Tornjak",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/BOSNISCH-HERZEGOWINISCHER-KROATISCHER-SCHAFERHUND-355.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/tornjak",
    },
  ],
};

export default breed;
