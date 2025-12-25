import type { Breed } from "../../../types/breed";

export default {
  id: 264,
  details: {
    internal: "mastiff",
    public: ["Mastiff", "Old English Mastiff"],
  },
  classification: {
    fci: {
      group: 2,
      section: 2,
      standardNumber: 264,
    },
  },
  podcast: [
    {
      number: 235,
      episode: "Sternzeichen Bergziege",
      sources: [
        {
          url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/236-sternzeichen-bergziege-cc5x12bdhoocs",
          type: "audio",
        },
      ],
      meta: {
        internal: "portrait",
        public: "Rasseportrait",
        timecode: 729,
        airDate: "2025-11-20",
        isGuessable: true,
        isGuessedCorrectly: true,
        guessedBy: "mr",
      },
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Mastiff_(Hunderasse)",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/MASTIFF-264.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/mastiff",
    },
  ],
} satisfies Breed;
