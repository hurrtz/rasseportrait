import type { Breed } from "../../../types/breed";

export default {
  id: 371,
  details: {
    internal: "ratonero_bodeguero_andaluz",
    public: ["Ratonero Bodeguero Andaluz", "Andalusischer Terrier"],
  },
  classification: {
    fci: {
      group: 3,
      section: 2,
      standardNumber: 371,
    },
  },
  podcast: [
    {
      number: 13,
      episode: "Meeresungeheuer, Horrorwölfe und blinde Dackel",
      sources: [
        {
          url: "https://open.spotify.com/episode/7x5WPAY2kD0iWpxBcAoDZl",
          type: "audio",
          provider: "spotify",
        },
      ],
      meta: {
        internal: "portrait",
        public: "Rasseportrait",
        timecode: 2456,
        airDate: "2026-05-20",
        isGuessable: true,
        isGuessedCorrectly: true,
        guessedBy: "mr",
      },
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Ratonero_Bodeguero_Andaluz",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/ANDALUSISCHER-TERRIER-371.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/ratonero-bodeguero-andaluz",
    },
  ],
} satisfies Breed;
