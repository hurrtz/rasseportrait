import type { Breed } from "../../../types/breed";

export default {
  id: 237,
  details: {
    internal: "norwegian_buhund",
    public: [
      "Norwegischer Buhund",
      "Norsk Buhund",
      "Norwegian Sheppdog",
      "Norwegian Buhund",
      "Buhund norvégien",
    ],
  },
  classification: {
    fci: {
      group: 5,
      section: 3,
      standardNumber: 237,
    },
  },
  podcast: [
    {
      number: 146,
      episode: "Jahresrückblick (mit Conny Sporrer)",
      sources: [
        {
          url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/146-jahresrueckblick-mit-conny-sporrer-8m1rnr25r4dam",
          type: "audio",
        },
      ],
      meta: {
        internal: "portrait",
        public: "Rasseportrait",
        timecode: 2024,
        airDate: "2023-12-28",
        isGuessable: true,
        isGuessedCorrectly: true,
        guessedBy: "mr",
      },
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Norwegischer_Buhund",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/NORWEGISCHER-BUHUND-237.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/norwegischer-buhund",
    },
  ],
} satisfies Breed;
