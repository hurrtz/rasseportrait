import type { Breed } from "../../../types/breed";

export default {
  id: 356,
  details: {
    internal: "danish_swedish_farmdog",
    public: [
      "Dänisch-schwedischer Farmhund",
      "Dansk-Svensk Gårdhund",
      "dansk-svensk gårdshund",
      "sällskapshund",
      "Danski",
    ],
  },
  classification: {
    fci: {
      group: 2,
      section: 1,
      standardNumber: 356,
    },
  },
  podcast: [
    {
      number: 87,
      episode: "Tierisch menschlich auf dem Kilimandscharo",
      sources: [
        {
          url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/87-tierisch-menschlich-auf-dem-kilimandscharo-60d0fiqpcr9u0",
          type: "audio",
        },
      ],
      meta: {
        internal: "portrait",
        public: "Rasseportrait",
        timecode: 2457,
        airDate: "2022-11-10",
        isGuessable: true,
        isGuessedCorrectly: true,
        guessedBy: "mr",
      },
    },
    {
      number: 89,
      episode: "Bitte nicht nachmachen!",
      sources: [
        {
          url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/89-bitte-nicht-nachmachen-tt85sxkz7dhtd",
          type: "audio",
        },
      ],
      meta: {
        internal: "other",
        public:
          "Nachtrag zu Episode 87: «Tierisch menschlich auf dem Kilimandscharo»",
        timecode: 1756,
        airDate: "2022-11-24",
        isGuessable: undefined,
        isGuessedCorrectly: undefined,
        guessedBy: undefined,
      },
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Dansk-Svensk_G%C3%A5rdshund",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/DANISCH-SCHWEDISCHER-FARMHUND-356.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/danish-swedish-farmdog",
    },
  ],
} satisfies Breed;
