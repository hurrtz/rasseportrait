import type { Breed } from "../../../types/breed";

export default {
  id: 229,
  details: {
    internal: "dreifarbiger_serbischer_laufhund",
    public: ["Dreifarbiger Serbischer Laufhund", "Srpski Trobojni Gonič"],
  },
  classification: {
    fci: {
      group: 6,
      section: 1.2,
      standardNumber: 229,
    },
  },
  podcast: [
    {
      number: 20,
      episode: "Rien ne va plus",
      sources: [
        {
          // This publisher audio matches the VTT; the supplied AIS stream inserts ads.
          url: "https://cdn.audiorella.com/podcasts/1781-tierisch-menschlich/257878-new-episode.mp3?v=2#t=1759",
          type: "audio",
        },
      ],
      meta: {
        internal: "portrait",
        public: "Rasseportrait",
        // Publisher VTT: FCI number at 00:29:19; Katharina reveals the breed at 00:32:15.
        timecode: 1759,
        airDate: "2026-11-05",
        isGuessable: true,
        // Martin does not identify the breed before the reveal.
        isGuessedCorrectly: false,
        guessedBy: "mr",
      },
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Dreifarbiger_Serbischer_Laufhund",
    },
    {
      name: "Spotify-Folge",
      url: "https://open.spotify.com/episode/0LPrg4NondReGdNRNnUEkE",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/DREIFARBIGER-SERBISCHER-LAUFHUND-229.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/dreifarbiger-serbischer-laufhund",
    },
  ],
} satisfies Breed;
