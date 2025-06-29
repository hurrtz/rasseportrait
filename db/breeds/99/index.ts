import type { Breed } from "../../../types/breed";

export default {
  id: 99,
  details: {
    internal: "weimaraner",
    public: ["Weimaraner"],
    variants: [
      {
        internal: "short",
        public: "Kurzhaar",
        furtherReading: [
          {
            name: "VDH",
            url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/weimaraner-kurzhaar",
          },
        ],
      },
      {
        internal: "long",
        public: "Langhaar",
        furtherReading: [
          {
            name: "VDH",
            url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/weimaraner-langhaar",
          },
        ],
      },
    ],
  },
  classification: {
    fci: {
      group: 7,
      section: 1,
      standardNumber: 99,
    },
  },
  podcast: [
    {
      number: 52,
      episode: "Richtig Helfen, fliegende Kotbeutel & der Weimaraner",
      sources: [
        {
          url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/52-richtig-helfen-fliegende-kotbeutel-der-weimaraner-m5dz64ld7wmvh",
          type: "audio",
        },
      ],
      meta: {
        internal: "portrait",
        public: "Rasseportrait",
        timecode: 2427,
        airDate: "2022-03-10",
        isGuessable: true,
        isGuessedCorrectly: true,
        guessedBy: "mr",
      },
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Weimaraner",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/WEIMARANER-99.html",
    },
    {
      name: "Martin Rütter",
      url: "https://www.martinruetter.com/rassekunde/weimaraner",
    },
  ],
} as Breed;
