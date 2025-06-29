import type { Breed } from "../../../types/breed";

export default {
  id: 226,
  details: {
    internal: "landseer_dog",
    public: ["Landseer"],
  },
  classification: {
    fci: {
      group: 2,
      section: 2,
      standardNumber: 226,
    },
  },
  podcast: [
    {
      number: 46,
      episode: "Landseer, Seepferdchen und der Hundeprofi in Seenot",
      sources: [
        {
          url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/46-landseer-seepferdchen-und-der-hundeprofi-in-seenot-7zqr09d3n0k4c",
          type: "audio",
        },
      ],
      meta: {
        internal: "portrait",
        public: "Rasseportrait",
        timecode: 1766,
        airDate: "2022-01-27",
        isGuessable: false,
        isGuessedCorrectly: undefined,
        guessedBy: "mr",
      },
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Landseer_(Hunderasse)",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/LANDSEER-EUROPAISCH-KONTINENTALER-TYP-226.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/landseer",
    },
    {
      name: "Martin Rütter",
      url: "https://www.martinruetter.com/rassekunde/landseer",
    },
  ],
} as Breed;
