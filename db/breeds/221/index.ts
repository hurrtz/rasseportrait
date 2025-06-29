import type { Breed } from "../../../types/breed";

export default {
  id: 221,
  details: {
    internal: "wetterhoun",
    public: ["Wetterhoun", "Friesischer Wasserhund"],
  },
  classification: {
    fci: {
      group: 8,
      section: 3,
      standardNumber: 221,
    },
  },
  podcast: [
    {
      number: 133,
      episode: "Ein bisschen Paloma",
      sources: [
        {
          url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/133-ein-bisschen-paloma-189d70agws5z3",
          type: "audio",
        },
      ],
      meta: {
        internal: "portrait",
        public: "Rasseportrait",
        timecode: 2628,
        airDate: "2023-09-28",
        isGuessable: true,
        isGuessedCorrectly: true,
        guessedBy: "mr",
      },
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Wetterhoun",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/FRIESISCHER-WASSERHUND-221.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/wetterhoun",
    },
  ],
} as Breed;
