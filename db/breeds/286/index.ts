import type { Breed } from "../../../types/breed";

export default {
  id: 286,
  details: {
    internal: "american_staffordshire_terrier",
    public: ["American Staffordshire Terrier", "Amstaff"],
  },
  classification: {
    fci: {
      group: 3,
      section: 3,
      standardNumber: 286,
    },
  },
  podcast: [
    {
      number: 54,
      episode:
        "Starke Frauen, eine blutige Nase & der American Staffordshire Terrier",
      sources: [
        {
          url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/54-starke-frauen-eine-blutige-nase-der-american-staffordshire-terrier-5u9lggnny8ey9",
          type: "audio",
        },
      ],
      meta: {
        internal: "portrait",
        public: "Rasseportrait",
        timecode: 1200,
        airDate: "2022-03-24",
        isGuessable: false,
        isGuessedCorrectly: undefined,
        guessedBy: "mr",
      },
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/American_Staffordshire_Terrier",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/AMERICAN-STAFFORDSHIRE-TERRIER-286.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/american-staffordshire-terrier",
    },
  ],
} satisfies Breed;
