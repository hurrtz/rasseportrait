import type { Breed } from "../../../types/breed";

export default {
  id: 339,
  details: {
    internal: "parson_russell_terrier",
    public: ["Parson Russell Terrier"],
  },
  classification: {
    fci: {
      group: 3,
      section: 1,
      standardNumber: 339,
    },
  },
  podcast: [
    {
      number: 125,
      episode: "Kampf der Urzeitkrebse",
      sources: [
        {
          url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/125-kampf-der-urzeitkrebse-i8h9g7dvtu49g",
          type: "audio",
        },
      ],
      meta: {
        internal: "portrait",
        public: "Rasseportrait",
        timecode: 2081,
        airDate: "2023-08-03",
        isGuessable: true,
        isGuessedCorrectly: true,
        guessedBy: "mr",
      },
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Parson_Russell_Terrier",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/PARSON-RUSSELL-TERRIER-339.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/parson-russell-terrier",
    },
  ],
} satisfies Breed;
