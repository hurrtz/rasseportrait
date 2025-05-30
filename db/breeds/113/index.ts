import type { Breed } from "../../../types/breed";

export default {
  id: 113,
  details: {
    internal: "briard",
    public: ["Briard", "Berger de Brie"],
  },
  classification: {
    fci: {
      group: 1,
      section: 1,
      standardNumber: 113,
    },
  },
  podcast: [
    {
      number: 135,
      episode: "Herbstanfang",
      sources: [
        {
          url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/135-herbstanfang-mjmh2c8xp08jy",
          type: "audio",
        },
      ],
      meta: {
        internal: "portrait",
        public: "Rasseportrait",
        timecode: 2978,
        airDate: "2023-10-12",
        isGuessable: true,
        isGuessedCorrectly: true,
        guessedBy: "mr",
      },
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Briard",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/BERGER-DE-BRIE-113.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/berger-de-brie",
    },
    {
      name: "Martin Rütter",
      url: "https://www.martinruetter.com/rassekunde/briard",
    },
  ],
} as Breed;
