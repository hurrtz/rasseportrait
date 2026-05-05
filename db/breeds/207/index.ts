import type { Breed } from "../../../types/breed";

export default {
  id: 207,
  details: {
    internal: "pekingese",
    public: ["Pekingese"],
  },
  classification: {
    fci: {
      group: 9,
      section: 8,
      standardNumber: 207,
    },
  },
  podcast: [
    {
      number: 10,
      episode: "Überwundener Sigmatismus und Nackenprobleme",
      sources: [
        {
          url: "https://open.spotify.com/episode/1DCP3N03NDawppcIsHFoLe",
          type: "audio",
          provider: "spotify",
        },
      ],
      meta: {
        internal: "portrait",
        public: "Rasseportrait",
        timecode: 2549,
        airDate: "2026-04-29",
        isGuessable: true,
        isGuessedCorrectly: true,
        guessedBy: "mr",
      },
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Pekingese",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/PEKINGESE-207.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/pekingese",
    },
  ],
} satisfies Breed;
