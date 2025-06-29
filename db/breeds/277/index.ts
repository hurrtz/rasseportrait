import type { Breed } from "../../../types/breed";

export default {
  id: 277,
  details: {
    internal: "croatian_sheepdog",
    public: ["Hrvatski ovčar", "Kroatischer Schäferhund"],
  },
  classification: {
    fci: {
      group: 1,
      section: 1,
      standardNumber: 277,
    },
  },
  podcast: [
    {
      number: 208,
      episode: "Wie die Lemminge",
      sources: [
        {
          url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/208-wie-die-lemminge-y0ypqy92z48z2",
          type: "audio",
        },
      ],
      meta: {
        internal: "portrait",
        public: "Rasseportrait",
        timecode: 679,
        airDate: "2025-03-09",
        isGuessable: true,
        isGuessedCorrectly: false,
        guessedBy: "mr",
      },
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Hrvatski_ov%C4%8Dar",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/KROATISCHER-SCHAFERHUND-277.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/hrvatski-ovcar",
    },
  ],
} satisfies Breed;
