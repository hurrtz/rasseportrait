import type { Breed } from "../../../types/breed";

export default {
  id: 298,
  details: {
    internal: "lagotto_romagnolo",
    public: [
      "Lagotto Romagnolo",
      "Wasserhund der Romagna",
      "Italienischer Trüffelhund",
    ],
  },
  classification: {
    fci: {
      group: 8,
      section: 3,
      standardNumber: 298,
    },
  },
  podcast: [
    {
      number: 138,
      episode: "Fichtenflitzer, Riesenregenwurm & Kot-Tapete",
      sources: [
        {
          url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/138-fichtenflitzer-riesenregenwurm-kot-tapete-lcq6dk9w7df3w",
          type: "audio",
        },
      ],
      meta: {
        internal: "portrait",
        public: "Rasseportrait",
        timecode: 818,
        airDate: "2023-11-02",
        isGuessable: true,
        isGuessedCorrectly: true,
        guessedBy: "mr",
      },
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Lagotto_Romagnolo",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/WASSERHUND-DER-ROMAGNA-298.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/lagotto-romagnolo",
    },
    {
      name: "Martin Rütter",
      url: "https://www.martinruetter.com/rassekunde/lagotto-romagnolo",
    },
  ],
} satisfies Breed;
