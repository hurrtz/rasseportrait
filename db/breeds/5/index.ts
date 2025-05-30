import type { Breed } from "../../../types/breed";

const breed: Breed = {
  id: 5,
  details: {
    internal: "english_cocker_spaniel",
    public: ["English Cocker Spaniel"],
  },
  classification: {
    fci: {
      group: 8,
      section: 2,
      standardNumber: 5,
    },
  },
  podcast: [
    {
      number: 113,
      episode: "Welpenhandel, Wolfsbegegnung & Ölkäfer",
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/113-welpenhandel-wolfsbegegnung-oelkaefer-05xtswrnw6hnb",
      meta: {
        internal: "portrait",
        public: "Rasseportrait",
        timecode: 2298,
        airDate: "2023-05-11",
        isGuessable: true,
        isGuessedCorrectly: true,
        guessedBy: "mr",
      },
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/English_Cocker_Spaniel",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/ENGLISH-COCKER-SPANIEL-5.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/english-cocker-spaniel",
    },
    {
      name: "Martin Rütter",
      url: "https://www.martinruetter.com/rassekunde/english-cocker-spaniel",
    },
  ],
};

export default breed;
