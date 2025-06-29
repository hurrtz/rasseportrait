import type { Breed } from "../../../types/breed";

export default {
  id: 40,
  details: {
    internal: "irish_soft_coated_wheaten_terrier",
    public: ["Irish Soft Coated Wheaten Terrier"],
  },
  classification: {
    fci: {
      group: 3,
      section: 1,
      standardNumber: 40,
    },
  },
  podcast: [
    {
      number: 159,
      episode: "Fischklingel, Osterfeuer & Weizenfarbe",
      sources: [
        {
          url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/159-fischklingel-osterfeuer-weizenfarbe-o1tpe1gkh4pyu",
          type: "audio",
        },
      ],
      meta: {
        internal: "portrait",
        public: "Rasseportrait",
        timecode: 2012,
        airDate: "2024-03-28",
        isGuessable: true,
        isGuessedCorrectly: true,
        guessedBy: "mr",
      },
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Irish_Soft_Coated_Wheaten_Terrier",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/IRISCHER-SOFT-COATED-WHEATEN-TERRIER-40.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/irish-soft-coated-wheaten-terrier",
    },
  ],
} as Breed;
