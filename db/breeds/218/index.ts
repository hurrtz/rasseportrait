import type { Breed } from "../../../types/breed";

export default {
  id: 218,
  details: {
    internal: "chihuahua",
    public: ["Chihuahua", "Techichi", "Chihuahueño"],
    variants: [
      {
        internal: "short",
        public: "kurzhaarig",
        furtherReading: [
          {
            name: "VDH",
            url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/chihuahua-kurzhaar",
          },
        ],
      },
      {
        internal: "long",
        public: "langhaarig",
        furtherReading: [
          {
            name: "VDH",
            url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/chihuahua-langhaar",
          },
        ],
      },
    ],
  },
  classification: {
    fci: {
      group: 9,
      section: 6,
      standardNumber: 218,
    },
  },
  podcast: [
    {
      number: 48,
      episode: "Zuchtverbote, Eutrophierung & Helmpflicht für Chihuahuas",
      sources: [
        {
          url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/48-zuchtverbote-eutrophierung-helmpflicht-fuer-chihuahuas-532onwpr31v22",
          type: "audio",
        },
      ],
      meta: {
        internal: "portrait",
        public: "Rasseportrait",
        timecode: 2362,
        airDate: "2022-02-10",
        isGuessable: true,
        isGuessedCorrectly: true,
        guessedBy: "mr",
      },
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Chihuahua_(Hunderasse)",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/CHIHUAHUA-218.html",
    },
    {
      name: "Martin Rütter",
      url: "https://www.martinruetter.com/rassekunde/chihuahua",
    },
  ],
} as Breed;
