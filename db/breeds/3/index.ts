import type { Breed } from "../../../types/breed";

export default {
  id: 3,
  details: {
    internal: "kerry_blue_terrier",
    public: ["Kerry Blue Terrier"],
  },
  classification: {
    fci: {
      group: 3,
      section: 1,
      standardNumber: 3,
    },
  },
  podcast: [
    {
      number: 3,
      episode: "Fremdscham im Bierkönig",
      sources: [
        {
          url: "https://open.spotify.com/episode/6uBq1u1cKqMAFkoJEU3dxo",
          type: "audio",
          provider: "spotify",
        },
      ],
      meta: {
        internal: "portrait",
        public: "Rasseportrait",
        timecode: 1183,
        airDate: "2026-03-12",
        isGuessable: true,
        isGuessedCorrectly: true,
        guessedBy: "mr",
      },
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Kerry_Blue_Terrier",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/KERRY-BLUE-TERRIER-3.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/kerry-blue-terrier",
    },
  ],
} satisfies Breed;
