import type { Breed } from "../../../types/breed";

export default {
  id: 9,
  details: {
    internal: "bedlington_terrier",
    public: ["Bedlington Terrier", "Rothbury Terrier"],
  },
  classification: {
    fci: {
      group: 3,
      section: 1,
      standardNumber: 9,
    },
  },
  podcast: [
    {
      number: 188,
      episode: "Selbstreflexion & Pudelhaube",
      sources: [
        {
          url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/188-selbstreflexion-pudelhaube-1co8nbj85o8tw",
          type: "audio",
        },
      ],
      meta: {
        internal: "portrait",
        public: "Rasseportrait",
        timecode: 1944,
        airDate: "2024-10-17",
        isGuessable: true,
        isGuessedCorrectly: true,
        guessedBy: "mr",
      },
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Bedlington_Terrier",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/BEDLINGTON-TERRIER-9.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/bedlington-terrier",
    },
  ],
} satisfies Breed;
