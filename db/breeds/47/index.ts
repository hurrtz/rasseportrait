import type { Breed } from "../../../types/breed";

export default {
  id: 47,
  details: {
    internal: "entlebucher_mountain_dog",
    public: ["Entlebucher Sennenhund"],
  },
  classification: {
    fci: {
      group: 2,
      section: 3,
      standardNumber: 47,
    },
  },
  podcast: [
    {
      number: 147,
      episode: "Braunes Rauschen & veganes Futter",
      sources: [
        {
          url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/147-braunes-rauschen-veganes-futter-rq1a38523a8db",
          type: "audio",
        },
      ],
      meta: {
        internal: "portrait",
        public: "Rasseportrait",
        timecode: 2865,
        airDate: "2024-01-04",
        isGuessable: true,
        isGuessedCorrectly: true,
        guessedBy: "mr",
      },
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Entlebucher_Sennenhund",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/ENTLEBUCHER-SENNENHUND-47.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/entlebucher-sennenhund",
    },
    {
      name: "Martin Rütter",
      url: "https://www.martinruetter.com/rassekunde/entlebucher-sennenhund",
    },
  ],
} as Breed;
