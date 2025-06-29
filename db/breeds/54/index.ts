import type { Breed } from "../../../types/breed";

export default {
  id: 54,
  details: {
    internal: "kuvasz",
    public: ["Kuvasz"],
  },
  classification: {
    fci: {
      group: 1,
      section: 1,
      standardNumber: 54,
    },
  },
  podcast: [
    {
      number: 98,
      episode: "Toadzilla, Tierhandel bei Ebay & Fischloopings",
      sources: [
        {
          url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/98-toadzilla-tierhandel-bei-ebay-fischloopings-3ajopzugmpayq",
          type: "audio",
        },
      ],
      meta: {
        internal: "portrait",
        public: "Rasseportrait",
        timecode: 1987,
        airDate: "2023-01-26",
        isGuessable: true,
        isGuessedCorrectly: true,
        guessedBy: "mr",
      },
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Kuvasz",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/KUVASZ-54.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/kuvasz",
    },
    {
      name: "Martin Rütter",
      url: "https://www.martinruetter.com/rassekunde/kuvasz",
    },
  ],
} as Breed;
