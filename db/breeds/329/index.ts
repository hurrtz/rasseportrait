import type { Breed } from "../../../types/breed";

export default {
  id: 329,
  details: {
    internal: "podenco_canario",
    public: ["Podenco Canario", "Kanarischer Podenco"],
    groupAs: "podenco",
  },
  classification: {
    fci: {
      group: 5,
      section: 7,
      standardNumber: 329,
    },
  },
  podcast: [
    {
      number: 59,
      episode: "Glow down, Hund & Baby, Lösseler Waldgeist",
      sources: [
        {
          url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/59-glow-down-hund-baby-loesseler-waldgeist-qthfcbunlahuh",
          type: "audio",
        },
      ],
      meta: {
        internal: "portrait",
        public: "Rasseportrait",
        timecode: 3885,
        airDate: "2022-04-28",
        isGuessable: true,
        isGuessedCorrectly: true,
        guessedBy: "mr",
      },
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Podenco_Canario",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/KANARISCHER-PODENCO-329.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/podenco-canario",
    },
    {
      name: "Martin Rütter",
      url: "https://www.martinruetter.com/rassekunde/podenco",
    },
  ],
} as Breed;
