import type { Breed } from "../../../types/breed";

export default {
  id: 291,
  details: {
    internal: "eurasier",
    public: ["Eurasier"],
  },
  classification: {
    fci: {
      group: 5,
      section: 5,
      standardNumber: 291,
    },
  },
  podcast: [
    {
      number: 60,
      episode: "Lost in the Sauerland, Boris Becker & Hunderassen-Studie",
      sources: [
        {
          url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/60-lost-in-the-sauerland-boris-becker-hunderassen-studie-qgpee4hjubcmh",
          type: "audio",
        },
      ],
      meta: {
        internal: "portrait",
        public: "Rasseportrait",
        timecode: 2079,
        airDate: "2022-05-05",
        isGuessable: true,
        isGuessedCorrectly: true,
        guessedBy: "mr",
      },
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Eurasier_(Hunderasse)",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/EURASIER-291.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/eurasier",
    },
  ],
} satisfies Breed;
