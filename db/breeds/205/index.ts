import type { Breed } from "../../../types/breed";

export default {
  id: 205,
  details: {
    internal: "chow_chow",
    public: ["Chow Chow"],
  },
  classification: {
    fci: {
      group: 5,
      section: 5,
      standardNumber: 205,
    },
  },
  podcast: [
    {
      number: 194,
      episode: "Akani, Igelnot & ein Gerichtsurteil",
      sources: [
        {
          url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/194-akani-igelnot-ein-gerichtsurteil-rtb0827raqywx",
          type: "audio",
        },
      ],
      meta: {
        internal: "portrait",
        public: "Rasseportrait",
        timecode: 647,
        airDate: "2024-11-28",
        isGuessable: true,
        isGuessedCorrectly: true,
        guessedBy: "mr",
      },
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
    {
      name: "Martin Rütter",
      url: "https://www.martinruetter.com/ratgeber/rassekunde/chow-chow",
    },
  ],
} as Breed;
