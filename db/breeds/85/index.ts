import type { Breed } from "../../../types/breed";

export default {
  id: 85,
  details: {
    internal: "west_highland_white_terrier",
    public: [
      "West Highland White Terrier",
      "Weißer Hochlandterrier",
      "Westie",
      "Poltalloch Terrier",
      "Roseneath Terrier",
    ],
  },
  classification: {
    fci: {
      group: 3,
      section: 2,
      standardNumber: 85,
    },
  },
  podcast: [
    {
      number: 4,
      episode: "Flaute für den Tierschutz",
      sources: [
        {
          url: "https://open.spotify.com/episode/1X7aFxvqECPxU29slCUhW1",
          type: "audio",
          provider: "spotify",
        },
      ],
      meta: {
        internal: "portrait",
        public: "Rasseportrait",
        timecode: 3380,
        airDate: "2026-03-19",
        isGuessable: true,
        isGuessedCorrectly: true,
        guessedBy: "mr",
      },
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/West_Highland_White_Terrier",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/WEST-HIGHLAND-WHITE-TERRIER-85.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/west-highland-white-terrier",
    },
  ],
} satisfies Breed;
