import type { Breed } from "../../../types/breed";

export default {
  id: 176,
  details: {
    internal: "berger_picard",
    public: ["Berger de Picardie", "Berger Picard"],
  },
  classification: {
    fci: {
      group: 1,
      section: 1,
      standardNumber: 176,
    },
  },
  podcast: [
    {
      number: 171,
      episode: "Abschied in die Sommerpause",
      sources: [
        {
          url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/171-abschied-in-die-sommerpause-sst637kxiu8ty",
          type: "audio",
        },
      ],
      meta: {
        internal: "portrait",
        public: "Rasseportrait",
        timecode: 2251,
        airDate: "2024-06-20",
        isGuessable: true,
        isGuessedCorrectly: true,
        guessedBy: "mr",
      },
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Berger_de_Picardie",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/PICARDIE-SCHAFERHUND-176.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/berger-de-picardie",
    },
  ],
} as Breed;
