import type { Breed } from "../../../types/breed";

export default {
  id: 201,
  details: {
    internal: "maremmano_abruzzese_sheepdog",
    public: ["Maremmen-Abruzzen-Schäferhund"],
  },
  classification: {
    fci: {
      group: 1,
      section: 1,
      standardNumber: 201,
    },
  },
  podcast: [
    {
      number: 2,
      episode: "Hälse, Hoffnung, Haarverlust",
      sources: [
        {
          url: "https://open.spotify.com/episode/350DmDreiUXKWJ5SaRtUm3",
          type: "audio",
          provider: "spotify",
        },
      ],
      meta: {
        internal: "portrait",
        public: "Rasseportrait",
        timecode: 1522,
        airDate: "2026-03-05",
        isGuessable: true,
        isGuessedCorrectly: true,
        guessedBy: "mr",
      },
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Maremmen-Abruzzen-Schäferhund",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/ABRUZZEN-MAREMMEN-SCHAFERHUND-201.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/maremmen-abruzzen-schaeferhund",
    },
  ],
} satisfies Breed;
