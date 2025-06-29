import type { Breed } from "../../../types/breed";

export default {
  id: 104,
  details: {
    internal: "german_spaniel",
    public: ["Deutscher Wachtelhund", "Deutsche Wachtel", "Deutscher Spaniel"],
  },
  classification: {
    fci: {
      group: 8,
      section: 2,
      standardNumber: 104,
    },
  },
  podcast: [
    {
      number: 205,
      episode: "Biber an die Macht",
      sources: [
        {
          url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/205-biber-an-die-macht-4jqr0gglrlroo",
          type: "audio",
        },
      ],
      meta: {
        internal: "portrait",
        public: "Rasseportrait",
        timecode: 1218,
        airDate: "2025-02-14",
        isGuessable: true,
        isGuessedCorrectly: true,
        guessedBy: "mr",
      },
    },
    {
      number: 134,
      episode: "Mischwesen & Cancelculture",
      sources: [
        {
          url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/134-mischwesen-cancelculture-v758khsqvx1l5",
          type: "audio",
        },
      ],
      meta: {
        internal: "personal_anecdote",
        public: "Persönliche Anekote",
        timecode: 4100,
        airDate: "2023-10-05",
        isGuessable: undefined,
        isGuessedCorrectly: undefined,
        guessedBy: undefined,
      },
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Deutscher_Wachtelhund",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/DEUTSCHER-WACHTELHUND-104.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/deutscher-wachtelhund",
    },
  ],
} as Breed;
