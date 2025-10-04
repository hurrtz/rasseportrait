import type { Breed } from "../../../types/breed";

export default {
  id: 217,
  details: {
    internal: "bavarian_mountain_hound",
    public: ["Bayerischer Gebirgsschweißhund"],
    hasVideo: true,
  },
  recognitions: ["Deborah"],
  classification: {
    fci: {
      group: 6,
      section: 2,
      standardNumber: 217,
    },
  },
  podcast: [
    {
      number: 121,
      episode: "Morbus Bahlsen & Acoustic Kitty",
      sources: [
        {
          url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/121-morbus-bahlsen-acoustic-kitty-qdz3pnuu3ngfr",
          type: "audio",
        },
      ],
      meta: {
        internal: "portrait",
        public: "Rasseportrait",
        timecode: 4346,
        airDate: "2023-07-06",
        isGuessable: true,
        isGuessedCorrectly: true,
        guessedBy: "mr",
      },
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Bayerischer_Gebirgsschwei%C3%9Fhund",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/BAYERISCHER-GEBIRGSSCHWEISSHUND-217.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/bayerischer-gebirgsschweisshund",
    },
  ],
} as Breed;
