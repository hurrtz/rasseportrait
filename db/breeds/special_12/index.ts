import type { Breed } from "../../../types/breed";

export default {
  id: "special_12",
  details: {
    internal: "schafpudel",
    public: ["Schafpudel"],
  },
  classification: {
    fci: undefined,
  },
  podcast: [
    {
      number: 11,
      episode: "Zaun Ideologien",
      sources: [
        {
          url: "https://open.spotify.com/episode/0Brj5vNMBvhl7Q5NVnlxL",
          type: "audio",
          provider: "spotify",
        },
      ],
      meta: {
        internal: "portrait",
        public: "Rasseportrait",
        timecode: 2330,
        airDate: "2026-05-06",
        isGuessable: true,
        isGuessedCorrectly: false,
        guessedBy: "mr",
      },
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Schafpudel",
    },
  ],
} satisfies Breed;
