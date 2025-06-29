import type { Breed } from "../../../types/breed";

export default {
  id: 184,
  details: {
    internal: "german_pinscher",
    public: ["Deutscher Pinscher"],
  },
  classification: {
    fci: {
      group: 2,
      section: 1,
      standardNumber: 184,
    },
  },
  podcast: [
    {
      number: 89,
      episode: "Bitte nicht nachmachen!",
      sources: [
        {
          url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/89-bitte-nicht-nachmachen-tt85sxkz7dhtd",
          type: "audio",
        },
      ],
      meta: {
        internal: "portrait",
        public: "Rasseportrait",
        timecode: 1470,
        airDate: "2022-11-24",
        isGuessable: true,
        isGuessedCorrectly: false,
        guessedBy: "mr",
      },
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Deutscher_Pinscher",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/DEUTSCHER-PINSCHER-184.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/deutscher-pinscher",
    },
    {
      name: "Martin Rütter",
      url: "https://www.martinruetter.com/rassekunde/deutscher-pinscher",
    },
  ],
} as Breed;
