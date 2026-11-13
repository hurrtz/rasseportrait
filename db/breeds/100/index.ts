import type { Breed } from "../../../types/breed";

export default {
  id: 100,
  details: {
    internal: "westfaelische_dachsbracke",
    public: ["Westfälische Dachsbracke"],
  },
  classification: {
    fci: {
      group: 6,
      section: 1.3,
      standardNumber: 100,
    },
  },
  podcast: [
    {
      number: 21,
      episode: "Gute Nachbarn, schlechte Nachbarn",
      sources: [
        {
          // Fixed Spotify time supplied by the owner; publisher VTT starts at 24:51.
          // Omit provider so Hundewissen keeps its separately timed publisher audio.
          url: "https://open.spotify.com/episode/6ss4YE8tucfjuAruRZAeEI?t=1740",
          type: "audio",
        },
      ],
      meta: {
        internal: "portrait",
        public: "Rasseportrait",
        timecode: 1740,
        airDate: "2026-11-12",
        isGuessable: true,
        isGuessedCorrectly: false,
        guessedBy: "mr",
      },
    },
  ],
  furtherReading: [
    {
      name: "Spotify-Folge",
      url: "https://open.spotify.com/episode/6ss4YE8tucfjuAruRZAeEI",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/WESTFALISCHE-DACHSBRACKE-100.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/westfaelische-dachsbracke",
    },
  ],
} satisfies Breed;
