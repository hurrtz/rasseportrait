import type { Breed } from "../../../types/breed";

export default {
  id: 300,
  details: {
    internal: "black_and_tan_coonhound",
    public: ["Black and Tan Coonhound", "Schwarz-roter Waschbärenhund"],
  },
  classification: {
    fci: {
      group: 6,
      section: 1,
      standardNumber: 300,
    },
  },
  podcast: [
    {
      number: 155,
      episode: "Biologisch logisch",
      sources: [
        {
          url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/155-biologisch-logisch-ssywwck5le064",
          type: "audio",
        },
      ],
      meta: {
        internal: "portrait",
        public: "Rasseportrait",
        timecode: 1245,
        airDate: "2024-02-29",
        isGuessable: true,
        isGuessedCorrectly: true,
        guessedBy: "mr",
      },
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Black_and_Tan_Coonhound",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/SCHWARZ-LOHFARBENER-WASCHBARENHUND-300.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/black-and-tan-coonhound",
    },
  ],
} satisfies Breed;
