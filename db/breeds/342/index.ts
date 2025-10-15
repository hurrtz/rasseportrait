import type { Breed } from "../../../types/breed";

export default {
  id: 342,
  details: {
    internal: "australian_shepherd",
    public: ["Australian Shepherd", "Australischer Schäferhund"],
    hasVideo: true,
  },
  classification: {
    fci: {
      group: 1,
      section: 1,
      standardNumber: 342,
    },
  },
  podcast: [
    {
      number: 182,
      episode: "Blümerle",
      sources: [
        {
          url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/182-bluemerle-wwapqiaojdbki",
          type: "audio",
        },
      ],
      meta: {
        internal: "portrait",
        public: "Rasseportrait",
        timecode: 2130,
        airDate: "2024-09-05",
        isGuessable: true,
        isGuessedCorrectly: true,
        guessedBy: "mr",
      },
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Australian_Shepherd",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/AUSTRALISCHER-SCHAFERHUND-342.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/australian-shepherd",
    },
    {
      name: "Martin Rütter",
      url: "https://www.martinruetter.com/rassekunde/australian-shepherd",
    },
  ],
} satisfies Breed;
