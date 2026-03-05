import type { Breed } from "../../../types/breed";

export default {
  id: 157,
  details: {
    internal: "bullmastiff",
    public: ["Bullmastiff"],
  },
  classification: {
    fci: {
      group: 2,
      section: 2,
      standardNumber: 157,
    },
  },
  podcast: [
    {
      number: 1,
      episode: "Wir sind wieder da - Tierisch Menschlich kehr zurück!",
      sources: [
        {
          url: "https://open.spotify.com/episode/5JXqG3gPc1Z5JohJ28jMh3",
          provider: "spotify",
          type: "audio",
        },
      ],
      meta: {
        internal: "portrait",
        public: "Rasseportrait",
        timecode: 984,
        airDate: "2026-02-26",
        isGuessable: true,
        isGuessedCorrectly: true,
        guessedBy: "mr",
      },
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Bullmastiff",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/BULLMASTIFF-157.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/bullmastiff",
    },
  ],
} as Breed;
