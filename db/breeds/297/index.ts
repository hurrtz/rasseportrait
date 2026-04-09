import type { Breed } from "../../../types/breed";

export default {
  id: 297,
  details: {
    internal: "border_collie",
    public: ["Border Collie"],
  },
  classification: {
    fci: {
      group: 1,
      section: 1,
      standardNumber: 297,
    },
  },
  podcast: [
    {
      number: 7,
      episode: "Von Walen und Menschen",
      sources: [
        {
          url: "https://open.spotify.com/episode/0dRtHyZnbynVEIuJhWekSH",
          type: "audio",
          provider: "spotify",
        },
      ],
      meta: {
        internal: "portrait",
        public: "Rasseportrait",
        timecode: 2690,
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
      url: "https://de.wikipedia.org/wiki/Border_Collie",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/BORDER-COLLIE-297.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/border-collie",
    },
  ],
} satisfies Breed;
