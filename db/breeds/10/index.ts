import type { Breed } from "../../../types/breed";

export default {
  id: 10,
  details: {
    internal: "border_terrier",
    public: ["Border Terrier"],
    hasVideo: true,
  },
  classification: {
    fci: {
      group: 3,
      section: 1,
      standardNumber: 10,
    },
  },
  podcast: [
    {
      number: 235,
      episode: "Das bisschen Blut!",
      sources: [
        {
          url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/235-das-bisschen-blut-l2xj1fwex331z",
          type: "audio",
        },
      ],
      meta: {
        internal: "portrait",
        public: "Rasseportrait",
        timecode: 3248,
        airDate: "2025-11-13",
        isGuessable: true,
        isGuessedCorrectly: true,
        guessedBy: "mr",
      },
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Border_Terrier",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/BORDER-TERRIER-10.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/border-terrier",
    },
    {
      name: "Martin Rütter",
      url: "https://www.martinruetter.com/rassekunde/border-terrier",
    },
  ],
} satisfies Breed;
