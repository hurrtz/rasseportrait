import type { Breed } from "../../../types/breed";

export default {
  id: 156,
  details: {
    internal: "collie",
    public: ["Collie"],
    variants: [
      {
        internal: "rough",
        public: "Langhaar",
      },
    ],
  },
  classification: {
    fci: {
      group: 1,
      section: 1,
      standardNumber: 156,
    },
  },
  podcast: [
    {
      number: 216,
      episode: "Missing Dog Syndrome",
      sources: [
        {
          url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/216-missing-dog-syndrome-v6p8x3s3b42pg",
          type: "audio",
        },
      ],
      meta: {
        internal: "portrait",
        public: "Rasseportrait",
        timecode: 1846,
        airDate: "2025-05-09",
        isGuessable: true,
        isGuessedCorrectly: true,
        guessedBy: "mr",
      },
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Langhaarcollie",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/LANGHAARIGER-SCHOTTISCHER-SCHAFERHUND-156.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/collie-langhaar",
    },
  ],
} as Breed;
