import type { Breed } from "../../../types/breed";

export default {
  id: 2,
  details: {
    internal: "english_setter",
    public: ["English Setter"],
  },
  classification: {
    fci: {
      group: 7,
      section: 2,
      standardNumber: 2,
    },
  },
  podcast: [
    {
      number: 15,
      episode: "Fettige Ohren und Albtraumbabys",
      sources: [
        {
          url: "https://open.spotify.com/episode/5cLYuFsMjw00uJm2tGaXAU",
          type: "audio",
          provider: "spotify",
        },
      ],
      meta: {
        internal: "portrait",
        public: "Rasseportrait",
        timecode: 2908,
        airDate: "2026-06-04",
        isGuessable: true,
        isGuessedCorrectly: true,
        guessedBy: "mr",
      },
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/English_Setter",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/ENGLISCHER-SETTER-2.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/english-setter",
    },
  ],
} satisfies Breed;
