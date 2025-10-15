import type { Breed } from "../../../types/breed";

export default {
  id: 15,
  details: {
    internal: "belgian_shepherd",
    public: ["Belgischer Schäferhund"],
    variants: [
      {
        internal: "malinois",
        public: "Malinois",
        furtherReading: [
          {
            name: "VDH",
            url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/malinois",
          },
          {
            name: "Martin Rütter",
            url: "https://www.martinruetter.com/rassekunde/malinois",
          },
        ],
      },
      {
        internal: "groenendael",
        public: "Groenendael",
        furtherReading: [
          {
            name: "VDH",
            url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/groenendael",
          },
        ],
      },
      {
        internal: "tervueren",
        public: "Tervueren",
        furtherReading: [
          {
            name: "VDH",
            url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/tervueren",
          },
        ],
      },
      {
        internal: "laekenois",
        public: "Laekenois",
        furtherReading: [
          {
            name: "VDH",
            url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/laekenois",
          },
        ],
      },
    ],
  },
  classification: {
    fci: {
      group: 1,
      section: 1,
      standardNumber: 15,
    },
  },
  podcast: [
    {
      number: 62,
      episode: "Tierschutzhundeverordnung, Strohhalmtest & Zwingerhaltung",
      sources: [
        {
          url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/62-tierschutzhundeverordnung-strohhalmtest-zwingerhaltung-vbf1lpiq5foqn",
          type: "audio",
        },
      ],
      meta: {
        internal: "portrait",
        public: "Rasseportrait",
        timecode: 3729,
        airDate: "2022-05-19",
        isGuessable: false,
        isGuessedCorrectly: undefined,
        guessedBy: "mr",
      },
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Belgischer_Sch%C3%A4ferhund",
    },
  ],
  recognitions: ["VDH"],
} satisfies Breed;
