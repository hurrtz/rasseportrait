import type { Breed } from "../../types/breed";

const breed: Breed = {
  id: "chow_chow",
  names: ["Chow Chow"],
  wasGuessedCorrectlyInPodcast: true,
  fci: {
    group: 5,
    section: 5,
    standardNumber: 205,
  },
  podcast: [
    {
      number: 194,
      episode: "Akani, Igelnot & ein Gerichtsurteil",
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/194-akani-igelnot-ein-gerichtsurteil-rtb0827raqywx",
      timecode: 647,
      airDate: "2024-11-28",
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Chow-Chow",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/CHOW-CHOW-205.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/chow-chow",
    },
  ],
};

export default breed;
