import type { Breed } from "../../../types/breed";

export default {
  id: 125,
  details: {
    internal: "english_springer_spaniel",
    public: ["English Springer Spaniel"],
  },
  classification: {
    fci: {
      group: 8,
      section: 2,
      standardNumber: 125,
    },
  },
  podcast: [
    {
      number: 109,
      episode: "Fliewatüüt, Fettfilter & Ferien",
      sources: [
        {
          url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/109-fliewatueuet-fettfilter-ferien-u84xhk4aavxfa",
          type: "audio",
        },
      ],
      meta: {
        internal: "portrait",
        public: "Rasseportrait",
        timecode: 3328,
        airDate: "2023-04-13",
        isGuessable: true,
        isGuessedCorrectly: true,
        guessedBy: "mr",
      },
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/English_Springer_Spaniel",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/ENGLISH-SPRINGER-SPANIEL-125.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/english-springer-spaniel",
    },
    {
      name: "Martin Rütter",
      url: "https://www.martinruetter.com/rassekunde/english-springer-spaniel",
    },
  ],
} as Breed;
