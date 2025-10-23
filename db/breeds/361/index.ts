import type { Breed } from "../../../types/breed";

export default {
  id: 361,
  details: {
    internal: "segugio_maremmano",
    public: ["Segugio Maremmano"],
    hasVideo: true,
  },
  classification: {
    fci: {
      group: 6,
      section: 1,
      standardNumber: 361,
    },
  },
  podcast: [
    {
      number: 232,
      episode: "Willkommen, Trudi!",
      sources: [
        {
          url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/232-willkommen-trudi-233yrn8zkcaj2",
          type: "audio",
        },
      ],
      meta: {
        internal: "portrait",
        public: "Rasseportrait",
        timecode: 2780,
        airDate: "2025-10-23",
        isGuessable: true,
        isGuessedCorrectly: false,
        guessedBy: "mr",
      },
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Segugio_Maremmano",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/SEGUGIO-MAREMMANO-361.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/segugio-maremmano",
    },
  ],
} satisfies Breed;
