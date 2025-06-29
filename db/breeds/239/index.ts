import type { Breed } from "../../../types/breed";

export default {
  id: 239,
  details: {
    internal: "viszla_wirehaired",
    public: ["Drahthaariger Ungarischer Vorstehhund", "Viszla"],
    groupAs: "Viszla",
  },
  classification: {
    fci: {
      group: 7,
      section: 1,
      standardNumber: 239,
    },
  },
  podcast: [
    {
      number: 53,
      episode: "Der Viszla, ein Weltrekord, & Gefahr durch Magendrehung",
      sources: [
        {
          url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/53-der-viszla-ein-weltrekord-gefahr-durch-magendrehung-u0o9xqbtbwfk3",
          type: "audio",
        },
      ],
      meta: {
        internal: "portrait",
        public: "Rasseportrait",
        timecode: 2414,
        airDate: "2022-03-17",
        isGuessable: false,
        isGuessedCorrectly: undefined,
        guessedBy: "mr",
      },
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Drahthaariger_Ungarischer_Vorstehhund",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/DRAHTHAARIGER-UNGARISCHER-VORSTEHHUND-239.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/magyar-vizsla-drahthaar",
    },
  ],
} satisfies Breed;
