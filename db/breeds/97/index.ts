import type { Breed } from "../../../types/breed";

export default {
  id: 97,
  details: {
    internal: "german_spitz",
    public: ["Deutscher Spitz"],
    variants: [
      {
        internal: "pomeranian",
        public: "Pomeranian",
        furtherReading: [
          {
            name: "VDH",
            url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/zwergspitz",
          },
        ],
      },
      {
        internal: "miniature",
        public: "Kleinspitz",
        furtherReading: [
          {
            name: "VDH",
            url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/kleinspitz",
          },
        ],
      },
      {
        internal: "medium",
        public: "Mittelspitz",
        furtherReading: [
          {
            name: "VDH",
            url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/mittelspitz",
          },
        ],
      },
      {
        internal: "large",
        public: "Großspitz",
        furtherReading: [
          {
            name: "VDH",
            url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/grossspitz",
          },
        ],
      },
      {
        internal: "keeshound",
        public: "Wolfsspitz",
        furtherReading: [
          {
            name: "VDH",
            url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/wolfsspitz",
          },
        ],
      },
    ],
  },
  classification: {
    fci: {
      group: 5,
      section: 4,
      standardNumber: 97,
    },
  },
  podcast: [
    {
      number: 49,
      episode: "Der Spitz, Zwingerhaltung & Puddingmatten",
      sources: [
        {
          url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/49-der-spitz-zwingerhaltung-puddingmatten-7hsefpcuadjr7",
          type: "audio",
        },
      ],
      meta: {
        internal: "portrait",
        public: "Rasseportrait",
        timecode: 924,
        airDate: "2022-02-17",
        isGuessable: false,
        isGuessedCorrectly: undefined,
        guessedBy: undefined,
      },
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Deutsche_Spitze",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/DEUTSCHER-SPITZ-97.html",
    },
  ],
} as Breed;
