import type { Breed } from "../../../types/breed";

export default {
  id: 103,
  details: {
    internal: "german_jagdterrier",
    public: ["Deutscher Jagdterrier"],
  },
  classification: {
    fci: {
      group: 3,
      section: 1,
      standardNumber: 103,
    },
  },
  podcast: [
    {
      number: 103,
      episode: "Feindliche Natur, Jagdverhalten & Hundehomöopathie",
      sources: [
        {
          url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/103-feindliche-natur-jagdverhalten-hundehomoeopathie-w2n7ys2hcqab2",
          type: "audio",
        },
      ],
      meta: {
        internal: "portrait",
        public: "Rasseportrait",
        timecode: 2280,
        airDate: "2023-03-02",
        isGuessable: true,
        isGuessedCorrectly: true,
        guessedBy: "mr",
      },
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Deutscher_Jagdterrier",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/DEUTSCHER-JAGDTERRIER-103.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/deutscher-jagdterrier",
    },
  ],
} as Breed;
