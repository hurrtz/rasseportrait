import type { Breed } from "../../../types/breed";

export default {
  id: 124,
  details: {
    internal: "irish_water_spaniel",
    public: [
      "Irish Water Spaniel",
      "Irischer Wasserspaniel",
      "Perro de agua irlandés",
      "Épagneul d'eau irlandais",
    ],
  },
  classification: {
    fci: {
      group: 8,
      section: 3,
      standardNumber: 124,
    },
  },
  podcast: [
    {
      number: 144,
      episode: "Stark wie ein Regenwurm",
      sources: [
        {
          url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/144-stark-wie-ein-regenwurm-yz5nu29vkfm1o",
          type: "audio",
        },
      ],
      meta: {
        internal: "portrait",
        public: "Rasseportrait",
        timecode: 2432,
        airDate: "2023-12-14",
        isGuessable: true,
        isGuessedCorrectly: true,
        guessedBy: "mr",
      },
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Irish_Water_Spaniel",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/IRISCHER-WASSERSPANIEL-124.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/irish-water-spaniel",
    },
  ],
} as Breed;
