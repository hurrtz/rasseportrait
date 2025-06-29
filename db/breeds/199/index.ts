import type { Breed } from "../../../types/breed";

export default {
  id: 199,
  details: {
    internal: "cirneco_dell_etna",
    public: ["Cirneco dell'Etna"],
  },
  classification: {
    fci: {
      group: 5,
      section: 7,
      standardNumber: 199,
    },
  },
  podcast: [
    {
      number: 110,
      episode: "Bulette & Bier",
      sources: [
        {
          url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/110-bulette-bier-evkbrps47ac2f",
          type: "audio",
        },
      ],
      meta: {
        internal: "portrait",
        public: "Rasseportrait",
        timecode: 1555,
        airDate: "2023-04-20",
        isGuessable: true,
        isGuessedCorrectly: true,
        guessedBy: "mr",
      },
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Cirneco_dell%E2%80%99Etna",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/CIRNECO-DELL-ETNA-199.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/cirneco-delletna",
    },
  ],
} as Breed;
