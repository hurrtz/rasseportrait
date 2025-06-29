import type { Breed } from "../../../types/breed";

export default {
  id: 338,
  details: {
    internal: "thai_ridgeback",
    public: ["Thai Ridgeback"],
  },
  classification: {
    fci: {
      group: 5,
      section: 7,
      standardNumber: 338,
    },
  },
  podcast: [
    {
      number: "Summer Edition #10",
      episode: "Stabile Typen",
      sources: [
        {
          url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/summer-edition-10-stabile-typen-4s4s3dlg5jjyi",
          type: "audio",
        },
      ],
      meta: {
        internal: "portrait",
        public: "Rasseportrait",
        timecode: 1008,
        airDate: "2024-08-29",
        isGuessable: true,
        isGuessedCorrectly: true,
        guessedBy: "mr",
      },
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Thai_Ridgeback",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/THAILAND-RIDGEBACK-338.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/thai-ridgeback-dog",
    },
    {
      name: "Martin Rütter",
      url: "https://www.martinruetter.com/rassekunde/thai-ridgeback",
    },
  ],
} satisfies Breed;
