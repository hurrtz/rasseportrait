import type { Breed } from "../../../types/breed";

export default {
  id: 121,
  details: {
    internal: "flat_coated_retriever",
    public: [
      "Flat Coated Retriever",
      "Retriever à poil plat",
      "Cobrador de pelo liso",
    ],
  },
  classification: {
    fci: {
      group: 8,
      section: 1,
      standardNumber: 121,
    },
  },
  podcast: [
    {
      number: 68,
      episode: "Einhoder, König der Kindsköpfe & verkohlte Hundepfoten",
      sources: [
        {
          url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/68-einhoder-koenig-der-kindskoepfe-verkohlte-hundepfoten-xyr6ciyqxhzcf",
          type: "audio",
        },
      ],
      meta: {
        internal: "portrait",
        public: "Rasseportrait",
        timecode: 2296,
        airDate: "2022-06-30",
        isGuessable: true,
        isGuessedCorrectly: undefined,
        guessedBy: "mr",
      },
    },
    {
      number: 183,
      episode: "Schiebeflöte",
      sources: [
        {
          url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/183-schiebefloete-z8ui95rb5t0rv",
          type: "audio",
        },
      ],
      meta: {
        internal: "listener_question",
        public: "Hörerfrage",
        timecode: 694,
        airDate: "2024-09-12",
        isGuessable: undefined,
        isGuessedCorrectly: undefined,
        guessedBy: undefined,
      },
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Flat_Coated_Retriever",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/FLAT-COATED-RETRIEVER-121.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/flat-coated-retriever",
    },
    {
      name: "Martin Rütter",
      url: "https://www.martinruetter.com/rassekunde/flat-coated-retriever",
    },
  ],
} as Breed;
