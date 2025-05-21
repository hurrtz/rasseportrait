import type { Breed } from "../../../types/breed";

const breed: Breed = {
  id: "jaemthund",
  names: ["Jämthund", "Schwedischer Elchhund"],
  wasGuessedCorrectlyInPodcast: true,
  fci: {
    group: 5,
    section: 2,
    standardNumber: 42,
  },
  podcast: [
    {
      number: 209,
      episode: "Der Amselrüde",
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/209-der-amselruede-1mufixb6e2c69",
      timecode: 1500,
      airDate: "2025-03-14",
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/J%C3%A4mthund",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/SCHWEDISCHER-ELCHHUND-42.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/jaemthund",
    },
  ],
};

export default breed;
