import type { Breed } from "../../../types/breed";

export default {
  id: 116,
  details: {
    internal: "bordeaux_mastiff",
    public: ["Bordeauxdogge", "Dogue de Bordeaux"],
  },
  classification: {
    fci: {
      group: 2,
      section: 2,
      standardNumber: 116,
    },
  },
  podcast: [
    {
      number: 114,
      episode: "Einfach machen",
      sources: [
        {
          url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/114-einfach-machen-t8x681865vs1g",
          type: "audio",
        },
      ],
      meta: {
        internal: "portrait",
        public: "Rasseportrait",
        timecode: 3228,
        airDate: "2023-05-18",
        isGuessable: true,
        isGuessedCorrectly: true,
        guessedBy: "mr",
      },
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Dogue_de_Bordeaux",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/BORDEAUXDOGGE-116.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/bordeauxdogge",
    },
    {
      name: "Martin Rütter",
      url: "https://www.martinruetter.com/rassekunde/bordeaux-dogge",
    },
  ],
} as Breed;
