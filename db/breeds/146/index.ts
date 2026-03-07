import type { Breed } from "../../../types/breed";

export default {
  id: 146,
  details: {
    internal: "rhodesian_ridgeback",
    public: ["Rhodesian Ridgeback"],
  },
  classification: {
    fci: {
      group: 6,
      section: 3,
      standardNumber: 146,
    },
  },
  podcast: [
    {
      number: 44,
      episode:
        "Geteiltes Sorgerecht für Tiere, falsches Mäusegulasch & Zwangspause für Polizeihunde",
      sources: [
        {
          url: "https://open.spotify.com/episode/3UUx5NbRc4v3Ww5BpGKIxF",
          type: "audio",
          provider: "spotify",
        },
        {
          url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/44-geteiltes-sorgerecht-fuer-tiere-falsches-maeusegulasch-zwangspause-fuer-polizeihunde-ioj5kmbkn4v7c",
          type: "audio",
          provider: "rtl",
        },
      ],
      meta: {
        internal: "portrait",
        public: "Rasseportrait",
        timecode: 3136,
        airDate: "2022-01-13",
        isGuessable: false,
        isGuessedCorrectly: undefined,
        guessedBy: "mr",
      },
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Rhodesian_Ridgeback",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/RHODESIAN-RIDGEBACK-146.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/rhodesian-ridgeback",
    },
    {
      name: "Martin Rütter",
      url: "https://www.martinruetter.com/rassekunde/rhodesian-ridgeback-1",
    },
  ],
} as Breed;
