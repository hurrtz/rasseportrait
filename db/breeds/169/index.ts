import type { Breed } from "../../../types/breed";

export default {
  id: 169,
  details: {
    internal: "fox_terrier_wire",
    public: ["Foxterrier"],
    groupAs: "Foxterrier",
    variants: [
      {
        internal: "wire",
        public: "Rauhhaar",
      },
    ],
  },
  classification: {
    fci: {
      group: 3,
      section: 1,
      standardNumber: 169,
    },
  },
  podcast: [
    {
      number: "Summer Edition #3",
      episode: "Martins Solo-Folge",
      sources: [
        {
          url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/summer-edition-3-martins-solo-folge-tfmv41s6tzg65",
          type: "audio",
        },
      ],
      meta: {
        internal: "other",
        public: "Anteasern des Rasseportraits in «Grausame Natur»",
        timecode: 948,
        airDate: "2024-07-11",
        isGuessable: undefined,
        isGuessedCorrectly: undefined,
        guessedBy: undefined,
      },
    },
    {
      number: "Summer Edition #5",
      episode: "Grausame Natur",
      sources: [
        {
          url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/summer-edition-5-grausame-natur-2cmtu8gbfflgx",
          type: "audio",
        },
      ],
      meta: {
        internal: "portrait",
        public: "Rasseportrait",
        timecode: 277,
        airDate: "2024-07-25",
        isGuessable: false,
        isGuessedCorrectly: undefined,
        guessedBy: "mr",
      },
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Foxterrier",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/FOX-TERRIER-DRAHTHAAR-169.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/fox-terrier-drahthaar",
    },
  ],
} satisfies Breed;
