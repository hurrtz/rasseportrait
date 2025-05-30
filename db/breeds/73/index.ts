import type { Breed } from "../../../types/breed";

export default {
  id: 73,
  details: {
    internal: "scottish_terrier",
    public: ["Scottish Terrier"],
  },
  classification: {
    fci: {
      group: 3,
      section: 2,
      standardNumber: 73,
    },
  },
  podcast: [
    {
      number: 88,
      episode: "Ich bremse auch für Kinder",
      sources: [
        {
          url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/88-ich-bremse-auch-fuer-kinder-z4tmc9itz9sz3",
          type: "audio",
        },
      ],
      meta: {
        internal: "portrait",
        public: "Rasseportrait",
        timecode: 1817,
        airDate: "2022-11-17",
        isGuessable: true,
        isGuessedCorrectly: false,
        guessedBy: "mr",
      },
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Scottish_Terrier",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/SCHOTTISCHER-TERRIER-73.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/scottish-terrier",
    },
  ],
} as Breed;
