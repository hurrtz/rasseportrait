import type { Breed } from "../../../types/breed";

export default {
  id: 167,
  details: {
    internal: "american_cocker_spaniel",
    public: [
      "Amerikanischer Cocker Spaniel",
      "Americal Cocker Spaniel",
      "Cocker américain",
      "Cocker spaniel americano",
    ],
  },
  classification: {
    fci: {
      group: 8,
      section: 2,
      standardNumber: 167,
    },
  },
  podcast: [
    {
      number: 234,
      episode: "Martins Abschied von der Bühne",
      sources: [
        {
          url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/234-martins-abschied-von-der-buehne-tmlh5rv3dmjs0",
          type: "audio",
        },
      ],
      meta: {
        internal: "portrait",
        public: "Rasseportrait",
        timecode: 1928,
        airDate: "2025-11-06",
        isGuessable: true,
        isGuessedCorrectly: true,
        guessedBy: "mr",
      },
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Amerikanischer_Cocker_Spaniel",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/AMERIKANISCHER-COCKER-SPANIEL-167.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/american-cocker-spaniel",
    },
  ],
} satisfies Breed;
