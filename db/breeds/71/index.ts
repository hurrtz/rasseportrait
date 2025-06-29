import type { Breed } from "../../../types/breed";

export default {
  id: 71,
  details: {
    internal: "manchester_terrier",
    public: ["Manchester Terrier"],
  },
  classification: {
    fci: {
      group: 3,
      section: 1,
      standardNumber: 71,
    },
  },
  podcast: [
    {
      number: 158,
      episode: "Rattenfänger",
      sources: [
        {
          url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/158-rattenfaenger-2gvydqa8svsq9",
          type: "audio",
        },
      ],
      meta: {
        internal: "portrait",
        public: "Rasseportrait",
        timecode: 2985,
        airDate: "2024-03-21",
        isGuessable: true,
        isGuessedCorrectly: true,
        guessedBy: "mr",
      },
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://en.wikipedia.org/wiki/Manchester_Terrier",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/MANCHESTER-TERRIER-71.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/manchester-terrier",
    },
  ],
} as Breed;
