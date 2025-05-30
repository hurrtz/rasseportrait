import type { Breed } from "../../../types/breed";

export default {
  id: 355,
  details: {
    internal: "tornjak",
    public: ["Tornjak", "Bosnisch-herzegowinischer - kroatischer Schäferhund"],
  },
  classification: {
    fci: {
      group: 2,
      section: 2,
      standardNumber: 355,
    },
  },
  podcast: [
    {
      number: 186,
      episode: "Tierwohl paradox",
      sources: [
        {
          url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/186-tierwohl-paradox-kpxqn1g2q73xu",
          type: "audio",
        },
      ],
      meta: {
        internal: "portrait",
        public: "Rasseportrait",
        timecode: 2128,
        airDate: "2024-10-03",
        isGuessable: true,
        isGuessedCorrectly: false,
        guessedBy: "mr",
      },
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Tornjak",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/BOSNISCH-HERZEGOWINISCHER-KROATISCHER-SCHAFERHUND-355.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/tornjak",
    },
  ],
} satisfies Breed;
