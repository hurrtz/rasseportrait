import type { Breed } from "../../../types/breed";

export default {
  id: 317,
  details: {
    internal: "kai",
    public: ["Kai", "Kai Inu", "Tora Inu", "Kai Tora-Ken"],
  },
  classification: {
    fci: {
      group: 5,
      section: 5,
      standardNumber: 317,
    },
  },
  podcast: [
    {
      number: 17,
      episode: "OnlyFans für Murmeltiere",
      sources: [
        {
          // Use the transcript's audio until the longer Spotify version is aligned.
          url: "https://ais.audiorella.com/podcasts/1781-tierisch-menschlich/256558-new-episode.mp3?v=3&awCollectionId=julephosting_698de7bf5e693&awEpisodeId=256558#t=2315",
          type: "audio",
        },
      ],
      meta: {
        internal: "portrait",
        public: "Rasseportrait",
        // Publisher VTT: 00:38:35.773 (the earlier announcement leads into a detour).
        timecode: 2315,
        airDate: "2026-10-15",
        isGuessable: true,
        isGuessedCorrectly: false,
        guessedBy: "mr",
      },
    },
  ],
  furtherReading: [
    {
      name: "Spotify-Folge",
      url: "https://open.spotify.com/episode/4fTEvZFMApOiaxzVGLTgop",
    },
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Kai_(Hunderasse)",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/KAI-317.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/kai",
    },
  ],
} satisfies Breed;
