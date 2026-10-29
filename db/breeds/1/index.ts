import type { Breed } from "../../../types/breed";

export default {
  id: 1,
  details: {
    internal: "english_pointer",
    public: ["English Pointer", "Englischer Pointer"],
  },
  classification: {
    fci: {
      group: 7,
      section: 2,
      standardNumber: 1,
    },
  },
  podcast: [
    {
      number: 19,
      episode: "Aufgespürt und ausgekotzt",
      sources: [
        {
          // This publisher audio matches the VTT; the supplied AIS stream inserts ads.
          url: "https://cdn.audiorella.com/podcasts/1781-tierisch-menschlich/257461-new-episode.mp3?v=2#t=248",
          type: "audio",
        },
      ],
      meta: {
        internal: "portrait",
        public: "Rasseportrait",
        // Publisher VTT: 00:04:08.140. Martin identifies Pointer at 00:09:29.496.
        timecode: 248,
        airDate: "2026-10-29",
        isGuessable: true,
        // The owner's ruling accepts Martin narrowing it down to Pointers.
        isGuessedCorrectly: true,
        guessedBy: "mr",
      },
    },
  ],
  furtherReading: [
    {
      name: "Spotify-Folge",
      url: "https://open.spotify.com/episode/4JssBSpWAyBAouEJuKXlxL",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/ENGLISCHER-POINTER-1.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/english-pointer",
    },
  ],
} satisfies Breed;
