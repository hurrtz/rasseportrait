import type { Breed } from "../../../types/breed";

export default {
  id: 168,
  details: {
    internal: "dandie_dinmont_terrier",
    public: ["Dandie Dinmont Terrier"],
  },
  classification: {
    fci: {
      group: 3,
      section: 2,
      standardNumber: 168,
    },
  },
  podcast: [
    {
      number: 139,
      episode: "Co-Ownership & Knochen knacken",
      sources: [
        {
          url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/139-co-ownership-knochen-knacken-3ht5yygef4ypm",
          type: "audio",
        },
      ],
      meta: {
        internal: "portrait",
        public: "Rasseportrait",
        timecode: 2214,
        airDate: "2023-11-09",
        isGuessable: true,
        isGuessedCorrectly: false,
        guessedBy: "mr",
      },
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Dandie_Dinmont_Terrier",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/DANDIE-DINMONT-TERRIER-168.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/dandie-dinmont-terrier",
    },
  ],
} as Breed;
