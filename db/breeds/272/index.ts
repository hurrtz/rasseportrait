import type { Breed } from "../../../types/breed";

export default {
  id: 272,
  details: {
    internal: "norfolk_terrier",
    public: ["Norfolk Terrier"],
  },
  classification: {
    fci: {
      group: 3,
      section: 2,
      standardNumber: 272,
    },
  },
  podcast: [
    {
      number: 196,
      episode: "Werwolf-Syndrom",
      sources: [
        {
          url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/196-werwolf-syndrom-q5qmkz4aol7wd",
          type: "audio",
        },
      ],
      meta: {
        internal: "portrait",
        public: "Rasseportrait",
        timecode: 2089,
        airDate: "2024-12-12",
        isGuessable: true,
        isGuessedCorrectly: true,
        guessedBy: "mr",
      },
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Norfolk_Terrier",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/NORFOLK-TERRIER-272.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/norfolk-terrier",
    },
  ],
} satisfies Breed;
