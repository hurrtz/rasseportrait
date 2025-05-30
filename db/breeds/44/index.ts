import type { Breed } from "../../../types/breed";

export default {
  id: 44,
  details: {
    internal: "beauceron",
    public: ["Beauceron", "Berger de Beauce", "Chien de Beauce", "Bas-Rouge"],
  },
  classification: {
    fci: {
      group: 1,
      section: 1,
      standardNumber: 44,
    },
  },
  podcast: [
    {
      number: 120,
      episode: "Es ist zu warm",
      sources: [
        {
          url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/120-es-ist-zu-warm-02gkj0kij1nng",
          type: "audio",
        },
      ],
      meta: {
        internal: "portrait",
        public: "Rasseportrait",
        timecode: 2295,
        airDate: "2023-06-29",
        isGuessable: true,
        isGuessedCorrectly: true,
        guessedBy: "mr",
      },
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Beauceron",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/BEAUCERON-44.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/berger-de-beauce",
    },
  ],
} as Breed;
