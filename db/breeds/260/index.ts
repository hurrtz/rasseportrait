import type { Breed } from "../../../types/breed";

export default {
  id: 260,
  details: {
    internal: "tosa",
    public: ["Tosa", "Tosa Inu", "Japanische Dogge"],
  },
  classification: {
    fci: {
      group: 2,
      section: 2,
      standardNumber: 260,
    },
  },
  podcast: [
    {
      number: 18,
      episode: "Chaos, Linsen, Leberwurst",
      sources: [
        {
          // Use the transcript's audio until the longer Spotify version is aligned.
          url: "https://ais.audiorella.com/podcasts/1781-tierisch-menschlich/256995-new-episode.mp3?v=2&awCollectionId=julephosting_698de7bf5e693&awEpisodeId=256995#t=715",
          type: "audio",
        },
      ],
      meta: {
        internal: "portrait",
        public: "Rasseportrait",
        // Publisher VTT: 00:11:55.384; Martin's correct guess is at 00:15:31.557.
        timecode: 715,
        airDate: "2026-10-22",
        isGuessable: true,
        isGuessedCorrectly: true,
        guessedBy: "mr",
      },
    },
  ],
  furtherReading: [
    {
      name: "Spotify-Folge",
      url: "https://open.spotify.com/episode/6qn1hM9iGqlwWFWHTw6R53",
    },
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Tosa_(Hunderasse)",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/TOSA-260.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/tosa",
    },
  ],
} satisfies Breed;
