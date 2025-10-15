import type { Breed } from "../../../types/breed";

export default {
  id: 12,
  details: {
    internal: "fox_terrier_smooth",
    public: ["Foxterrier"],
    groupAs: "Foxterrier",
    variants: [
      {
        internal: "smooth",
        public: "Glatthaar",
      },
    ],
  },
  classification: {
    fci: {
      group: 3,
      section: 1,
      standardNumber: 12,
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
      url: "https://www.fci.be/de/nomenclature/FOX-TERRIER-GLATTHAAR-12.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/fox-terrier-glatthaar",
    },
  ],
} satisfies Breed;
