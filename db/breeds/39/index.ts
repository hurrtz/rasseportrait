import type { Breed } from "../../../types/breed";

export default {
  id: 39,
  details: {
    internal: "corgi_pembroke",
    public: ["Corgi"],
    variants: [
      {
        internal: "pembroke",
        public: "Welsh Corgi Pembroke",
      },
    ],
    groupAs: "Corgi",
  },
  classification: {
    fci: {
      group: 1,
      section: 2,
      standardNumber: 39,
    },
  },
  podcast: [
    {
      number: 50,
      episode: "Hundeparfüm, „Die Unvermittelbaren“ & der Corgi",
      sources: [
        {
          url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/50-hundeparfuem-die-unvermittelbaren-der-corgi-fkny11pjvlp4x",
          type: "audio",
        },
      ],
      meta: {
        internal: "portrait",
        public: "Rasseportrait",
        timecode: 2925,
        airDate: "2022-02-24",
        isGuessable: false,
        isGuessedCorrectly: undefined,
        guessedBy: "mr",
      },
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Welsh_Corgi_Pembroke",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/WELSH-CORGI-PEMBROKE-39.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/welsh-corgi-pembroke",
    },
  ],
} as Breed;
