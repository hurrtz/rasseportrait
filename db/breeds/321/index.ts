import type { Breed } from "../../../types/breed";

export default {
  id: 321,
  details: {
    internal: "majorca_shepherd_dog",
    public: [
      "Ca de Bestiar",
      "Perro de pastor mallorquín",
      "Mallorca-Schäferhund",
    ],
    variants: [
      {
        internal: "short",
        public: "Kurzhaar",
      },
      {
        internal: "wire",
        public: "Rauhhaar",
      },
    ],
  },
  classification: {
    fci: {
      group: 1,
      section: 1,
      standardNumber: 321,
    },
  },
  podcast: [
    {
      number: 166,
      episode: "Zwingerclub",
      sources: [
        {
          url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/166-zwingerclub-2ok8zkm2k969d",
          type: "audio",
        },
      ],
      meta: {
        internal: "portrait",
        public: "Rasseportrait",
        timecode: 2947,
        airDate: "2024-05-16",
        isGuessable: true,
        isGuessedCorrectly: true,
        guessedBy: "mr",
      },
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Ca_de_Bestiar",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/MALLORCA-SCHAFERHUND-321.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/perro-de-pastor-mallorquin",
    },
  ],
} satisfies Breed;
