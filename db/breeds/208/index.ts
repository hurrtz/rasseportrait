import type { Breed } from "../../../types/breed";

export default {
  id: 208,
  details: {
    internal: "shih_tzu",
    public: ["Shih Tzu", "獅子狗 / 狮子狗", "Shīzigǒu", "Löwenhund"],
  },
  classification: {
    fci: {
      group: 9,
      section: 5,
      standardNumber: 208,
    },
  },
  podcast: [
    {
      number: "Summer Edition #2",
      episode: "Sommernostalgie und Bahnärger",
      sources: [
        {
          url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/summer-edition-2-sommernostalgie-und-bahnaerger-0fne38y8v7soe",
          type: "audio",
        },
      ],
      meta: {
        internal: "portrait",
        public: "Rasseportrait",
        timecode: 1416,
        airDate: "2024-07-04",
        isGuessable: true,
        isGuessedCorrectly: true,
        guessedBy: "mr",
      },
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Shih_Tzu",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/SHIH-TZU-208.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/shih-tzu",
    },
  ],
} as Breed;
