import type { Breed } from "../../../types/breed";

export default {
  id: 140,
  details: {
    internal: "boston_terrier",
    public: ["Boston Terrier"],
  },
  classification: {
    fci: {
      group: 9,
      section: 11,
      standardNumber: 140,
    },
  },
  podcast: [
    {
      number: 160,
      episode: "Wettkampfdruck & Dackelverbot",
      sources: [
        {
          url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/160-wettkampfdruck-dackelverbot-u55fefrt71llx",
          type: "audio",
        },
      ],
      meta: {
        internal: "portrait",
        public: "Rasseportrait",
        timecode: 3220,
        airDate: "2024-04-04",
        isGuessable: true,
        isGuessedCorrectly: true,
        guessedBy: "mr",
      },
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Boston_Terrier",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/BOSTON-TERRIER-140.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/boston-terrier",
    },
  ],
} as Breed;
