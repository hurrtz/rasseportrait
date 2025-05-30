import type { Breed } from "../../../types/breed";

export default {
  id: 57,
  details: {
    internal: "viszla_shorthaired",
    public: ["Kurzhaariger Ungarischer Vorstehhund", "Viszla"],
    groupAs: "vizsla",
  },
  classification: {
    fci: {
      group: 7,
      section: 1,
      standardNumber: 57,
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
      url: "https://de.wikipedia.org/wiki/Kurzhaariger_Ungarischer_Vorstehhund",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/KURZHAARIGER-UNGARISCHER-VORSTEHHUND-VIZSLA-57.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/magyar-vizsla-kurzhaar",
    },
    {
      name: "Martin Rütter",
      url: "https://www.martinruetter.com/rassekunde/magyar-vizsla-kurzhaarig",
    },
  ],
} satisfies Breed;
