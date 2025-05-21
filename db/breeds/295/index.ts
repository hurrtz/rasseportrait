import type { Breed } from "../../../types/breed";

const breed: Breed = {
  id: "harrier",
  names: ["Harrier"],
  wasGuessedCorrectlyInPodcast: false,
  fci: {
    group: 6,
    section: 1,
    standardNumber: 295,
  },
  podcast: [
    {
      number: 212,
      episode: "Tourfinale, Garnelen und Stelzenhunde",
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/212-tourfinale-garnelen-und-stelzenhunde-n9b80w9jjgd0f",
      timecode: 963,
      airDate: "2025-04-04",
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Harrier_(Hunderasse)",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/HARRIER-295.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/harrier",
    },
  ],
};

export default breed;
