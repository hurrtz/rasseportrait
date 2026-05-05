import type { Breed } from "../../../types/breed";

export default {
  id: 234,
  details: {
    internal: "xoloitzcuintle",
    public: ["Xoloitzcuintle", "Mexikanischer Nackthund"],
  },
  classification: {
    fci: {
      group: 5,
      section: 6,
      standardNumber: 234,
    },
  },
  podcast: [
    {
      number: 8,
      episode: "Von großer Politik und ziemlich nackten Hunden",
      sources: [
        {
          url: "https://open.spotify.com/episode/5p0SLQjHk9RCWQFI7z7y4g",
          type: "audio",
          provider: "spotify",
        },
      ],
      meta: {
        internal: "portrait",
        public: "Rasseportrait",
        timecode: 3728,
        airDate: "2026-04-15",
        isGuessable: true,
        isGuessedCorrectly: true,
        guessedBy: "mr",
      },
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Peruanischer_Nackthund",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/MEXIKANISCHER-NACKTHUND-234.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/xoloitzcuintle",
    },
  ],
} satisfies Breed;
