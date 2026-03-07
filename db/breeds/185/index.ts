import type { Breed } from "../../../types/breed";

export default {
  id: 185,
  details: {
    internal: "miniature_pinscher",
    public: [
      "Zwergpinscher",
      "Rehpinscher",
      "Miniature Pinscher",
      "Minpin",
      "Minidoberman",
      "Rehrattler",
    ],
  },
  classification: {
    fci: {
      group: 2,
      section: 1,
      standardNumber: 185,
    },
  },
  podcast: [
    {
      number: 184,
      episode: "Wo ist Wilma?",
      sources: [
        {
          url: "https://open.spotify.com/episode/70HFCHnpLsw87Irp9nq8Ur",
          type: "audio",
          provider: "spotify",
        },
        {
          url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/184-wo-ist-wilma-7hen4hjz2wbam",
          type: "audio",
          provider: "rtl",
        },
      ],
      meta: {
        internal: "portrait",
        public: "Rasseportrait",
        timecode: 3300,
        airDate: "2024-09-19",
        isGuessable: true,
        isGuessedCorrectly: true,
        guessedBy: "mr",
      },
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Zwergpinscher",
    },
    {
      name: "FCI",
      url: "https://fci.be/de/nomenclature/ZWERGPINSCHER-185.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/zwergpinscher",
    },
    {
      name: "Martin Rütter",
      url: "https://www.martinruetter.com/rassekunde/zwergpinscher",
    },
  ],
} as Breed;
