import type { Breed } from "../../../types/breed";

export default {
  id: 17,
  details: {
    internal: "griffon_nivernais",
    public: ["Griffon Nivernais"],
  },
  classification: {
    fci: {
      group: 6,
      section: 1,
      standardNumber: 17,
    },
  },
  podcast: [
    {
      number: 150,
      episode: "Eine Laune der Natur",
      sources: [
        {
          url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/150-eine-laune-der-natur-urjn3ugdyex4s",
          type: "audio",
        },
      ],
      meta: {
        internal: "portrait",
        public: "Rasseportrait",
        timecode: 2507,
        airDate: "2024-01-25",
        isGuessable: true,
        isGuessedCorrectly: true,
        guessedBy: "mr",
      },
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Griffon_Nivernais",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/GRIFFON-NIVERNAIS-17.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/griffon-nivernais",
    },
  ],
} as Breed;
