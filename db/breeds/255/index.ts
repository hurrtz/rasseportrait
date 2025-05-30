import type { Breed } from "../../../types/breed";

export default {
  id: 255,
  details: {
    internal: "akita",
    public: ["Akita", "Akita-Inu", "Japanischer Akita", "Akita Ken", "秋田犬"],
    isOfficiallyPresented: false,
  },
  classification: {
    fci: {
      group: 5,
      section: 5,
      standardNumber: 255,
    },
  },
  podcast: [
    {
      number: "Summer Edition #7",
      episode: "Hobby Horsing for Olympia!",
      sources: [
        {
          url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/summer-edition-7-hobby-horsing-for-olympia-7pbpazh2zvi72",
          type: "audio",
        },
      ],
      meta: {
        internal: "other",
        public: "Vergleich mit American Akita",
        timecode: 1075,
        airDate: "2024-08-08",
        isGuessable: false,
        isGuessedCorrectly: undefined,
        guessedBy: "mr",
      },
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Akita_(Hunderasse)",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/AKITA-255.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/akita",
    },
    {
      name: "Martin Rütter",
      url: "https://www.martinruetter.com/rassekunde/akita",
    },
  ],
} satisfies Breed;
