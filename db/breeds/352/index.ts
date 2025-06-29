import type { Breed } from "../../../types/breed";

export default {
  id: 352,
  details: {
    internal: "russian_toy",
    public: [
      "Russkiy Toy",
      "Russischer Toy",
      "Russischer Zwergspaniel",
      "московский длинношерстный той-терьер",
    ],
    variants: [
      {
        internal: "long",
        public: "Moskauer Langhaariger Toy",
        furtherReading: [
          {
            name: "VDH",
            url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/russkiy-toy-langhaar",
          },
        ],
      },
      {
        internal: "smooth",
        public: "Kurzhaar",
        furtherReading: [
          {
            name: "VDH",
            url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/russkiy-toy-kurzhaar",
          },
        ],
      },
    ],
  },
  classification: {
    fci: {
      group: 9,
      section: 9,
      standardNumber: 352,
    },
  },
  podcast: [
    {
      number: 220,
      episode: "Baumpilze, Bambus und Bauchtasche",
      sources: [
        {
          url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/220-baumpilze-bambus-und-bauchtasche-r7fuvdbl5qzec",
          type: "audio",
        },
      ],
      meta: {
        internal: "portrait",
        public: "Rasseportrait",
        timecode: 2053,
        airDate: "2025-06-05",
        isGuessable: true,
        isGuessedCorrectly: true,
        guessedBy: "mr",
      },
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Russkiy_Toy",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/RUSSISCHER-TOY-352.html",
    },
  ],
} satisfies Breed;
