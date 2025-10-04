import type { Breed } from "../../../types/breed";

export default {
  id: 235,
  details: {
    internal: "great_dane",
    public: [
      "Deutsche Dogge",
      "Great Dane",
      "Ulmer Dogge",
      "Englische Dogge",
      "Dänische Dogge",
      "Hatzrüde",
      "Saupacker",
      "Große Dogge",
    ],
    hasVideo: true,
  },
  classification: {
    fci: {
      group: 2,
      section: 2,
      standardNumber: 235,
    },
  },
  podcast: [
    {
      number: 229,
      episode: "Riesen, Hämorrhoiden & Essgeräusche",
      sources: [
        {
          url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/riesen-haemorrhoiden-essgeraeusche-2bv0xl50a0o8p",
          type: "audio",
        },
      ],
      meta: {
        internal: "portrait",
        public: "Rasseportrait",
        timecode: 1595,
        airDate: "2025-10-01",
        isGuessable: true,
        isGuessedCorrectly: true,
        guessedBy: "mr",
      },
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Deutsche_Dogge",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/DEUTSCHE-DOGGE-235.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/deutsche-dogge",
    },
    {
      name: "Martin Rütter",
      url: "https://www.martinruetter.com/rassekunde/deutsche-dogge",
    },
  ],
} satisfies Breed;
