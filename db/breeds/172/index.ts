import type { Breed } from "../../../types/breed";

export default {
  id: 172,
  details: {
    internal: "poodle",
    public: ["Pudel", "Caniche"],
    variants: [
      {
        internal: "standard",
        public: "Großpudel",
        furtherReading: [
          {
            name: "VDH",
            url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/grosspudel",
          },
        ],
      },
      {
        internal: "medium",
        public: "Kleinpudel",
        furtherReading: [
          {
            name: "VDH",
            url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/kleinpudel",
          },
        ],
      },
      {
        internal: "small",
        public: "Zwergpudel",
        furtherReading: [
          {
            name: "VDH",
            url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/chihuahua-kurzhaar",
          },
        ],
      },
      {
        internal: "toy",
        public: "Toy-Pudel",
        furtherReading: [
          {
            name: "VDH",
            url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/chihuahua-kurzhaar",
          },
        ],
      },
    ],
  },
  classification: {
    fci: {
      group: 9,
      section: 2,
      standardNumber: 172,
    },
  },
  podcast: [
    {
      number: 13,
      episode: "Leben und leben lassen",
      sources: [
        {
          url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/13-leben-und-leben-lassen-23n9dglym2zxx",
          type: "audio",
        },
      ],
      meta: {
        internal: "personal_anecdote",
        public: "Persönliche Anekdote",
        timecode: 3510,
        airDate: "2021-06-01",
        isGuessable: undefined,
        isGuessedCorrectly: undefined,
        guessedBy: undefined,
      },
    },
    {
      number: 51,
      episode: "Wenn Nachrichten Angst machen",
      sources: [
        {
          url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/51-wenn-nachrichten-angst-machen-eay4li7j9ucbk",
          type: "audio",
        },
      ],
      meta: {
        internal: "portrait",
        public: "Rasseportrait",
        timecode: 1812,
        airDate: "2022-03-03",
        isGuessable: true,
        isGuessedCorrectly: true,
        guessedBy: "mr",
      },
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Pudel",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/PUDEL-172.html",
    },
    {
      name: "Martin Rütter",
      url: "https://www.martinruetter.com/rassekunde/pudel",
    },
  ],
} as Breed;
