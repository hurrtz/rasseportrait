import type { Breed } from "../../../types/breed";

export default {
  id: 206,
  details: {
    internal: "japanese_chin",
    public: ["Japan Chin"],
  },
  classification: {
    fci: {
      group: 9,
      section: 8,
      standardNumber: 206,
    },
  },
  podcast: [
    {
      number: 231,
      episode: "Ragebait, Qualzucht & Elch Erwin",
      sources: [
        {
          url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/231-ragebait-qualzucht-elch-erwin-g4112jk713gpm",
          type: "audio",
        },
      ],
      meta: {
        internal: "portrait",
        public: "Rasseportrait",
        timecode: 1845,
        airDate: "2025-10-16",
        isGuessable: true,
        isGuessedCorrectly: true,
        guessedBy: "mr",
      },
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Japan_Chin",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/JAPAN-CHIN-206.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/japan-chin",
    },
  ],
} satisfies Breed;
