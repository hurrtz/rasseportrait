import type { Breed } from "../../../types/breed";

export default {
  id: 223,
  details: {
    internal: "dutch_shepherd",
    public: ["Hollandse Herdershond", "Holländischer Schäferhund", "Herder"],
    variants: [
      {
        internal: "short",
        public: "Kurzhaar",
        furtherReading: [
          {
            name: "Martin Rütter",
            url: "https://www.martinruetter.com/rassekunde/hollaendischer-schaeferhund-kurzhaar",
          },
        ],
      },
      {
        internal: "long",
        public: "Langhaar",
      },
      {
        internal: "wire",
        public: "Rauhaar",
      },
    ],
  },
  classification: {
    fci: {
      group: 1,
      section: 1,
      standardNumber: 223,
    },
  },
  podcast: [
    {
      number: "Summer Edition #4",
      episode: "Körper kräftig, aber nicht ohne Adel!",
      sources: [
        {
          url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/summer-edition-4-koerper-kraeftig-aber-nicht-ohne-adel-zjwmcmhv4vzuh",
          type: "audio",
        },
      ],
      meta: {
        internal: "portrait",
        public: "Rasseportrait",
        timecode: 1502,
        airDate: "2024-07-18",
        isGuessable: true,
        isGuessedCorrectly: true,
        guessedBy: "mr",
      },
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Hollandse_Herdershond",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/HOLLANDISCHER-SCHAFERHUND-223.html",
    },
    {
      name: "herdershond.ch",
      url: "https://www.herdershond.ch/rasse/",
    },
  ],
} as Breed;
