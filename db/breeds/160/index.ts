import type { Breed } from "../../../types/breed";

export default {
  id: 160,
  details: {
    internal: "irish_wolfhound",
    public: ["Irischer Wolfshund", "Irish Wolfhound"],
  },
  classification: {
    fci: {
      group: 10,
      section: 2,
      standardNumber: 160,
    },
  },
  podcast: [
    {
      number: 75,
      episode: "Faultiere, Hitzschlag & Leben nach dem Tod",
      sources: [
        {
          url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/75-faultiere-hitzschlag-leben-nach-dem-tod-rqnqcr03z9fmo",
          type: "audio",
        },
      ],
      meta: {
        internal: "portrait",
        public: "Rasseportrait",
        timecode: 2544,
        airDate: "2022-08-18",
        isGuessable: true,
        isGuessedCorrectly: true,
        guessedBy: "mr",
      },
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Irischer_Wolfshund",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/IRISCHER-WOLFSHUND-160.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/irish-wolfhound",
    },
  ],
} as Breed;
