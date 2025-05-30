import type { Breed } from "../../../types/breed";

export default {
  id: 262,
  details: {
    internal: "japanese_spitz",
    public: [
      "Japan-Spitz",
      "日本スピッツ",
      "Nihon Supittsu",
      "Japanischer Spitz",
    ],
  },
  classification: {
    fci: {
      group: 5,
      section: 5,
      standardNumber: 262,
    },
  },
  podcast: [
    {
      number: 168,
      episode: "R.I.P. Kuno",
      sources: [
        {
          url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/168-rip-kuno-wq8x5w4z45ctt",
          type: "audio",
        },
      ],
      meta: {
        internal: "portrait",
        public: "Rasseportrait",
        timecode: 2072,
        airDate: "2024-05-31",
        isGuessable: true,
        isGuessedCorrectly: true,
        guessedBy: "mr",
      },
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Japan-Spitz",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/JAPAN-SPITZ-262.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/japan-spitz",
    },
  ],
} satisfies Breed;
