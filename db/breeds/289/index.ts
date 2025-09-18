import type { Breed } from "../../../types/breed";

export default {
  id: 289,
  details: {
    internal: "icelandic_sheepdog",
    public: [
      "Islandhund",
      "Íslenskur fjárhundur",
      "Isländischer Spitz",
      "Isländischer Schäferhund",
      "Icelandic Sheepdog",
    ],
  },
  classification: {
    fci: {
      group: 5,
      section: 3,
      standardNumber: 289,
    },
  },
  podcast: [
    {
      number: 227,
      episode: "Borstenwurm & Reizangel",
      sources: [
        {
          url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/227-borstenwurm-reizangel-jfjt8qv47reur",
          type: "audio",
        },
      ],
      meta: {
        internal: "portrait",
        public: "Rasseportrait",
        timecode: 2406,
        airDate: "2025-09-18",
        isGuessable: true,
        isGuessedCorrectly: true,
        guessedBy: "mr",
      },
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Islandhund",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/CHINESISCHER-SCHOPFHUND-288.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/islandhund",
    },
  ],
} satisfies Breed;
