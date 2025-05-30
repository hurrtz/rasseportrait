import type { Breed } from "../../../types/breed";

export default {
  id: 147,
  details: {
    internal: "rottweiler",
    public: ["Rottweiler"],
  },
  classification: {
    fci: {
      group: 2,
      section: 2,
      standardNumber: 147,
    },
  },
  podcast: [
    {
      number: 24,
      episode: "Ferienfolge",
      sources: [
        {
          url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/24-ferienfolge-lg7idzp6e0vr8",
          type: "audio",
        },
      ],
      meta: {
        internal: "portrait",
        public: "Rasseportrait",
        timecode: 275,
        airDate: "2021-08-17",
        isGuessable: false,
        isGuessedCorrectly: undefined,
        guessedBy: "mr",
      },
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Rottweiler",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/ROTTWEILER-147.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/rottweiler",
    },
    {
      name: "Martin Rütter",
      url: "https://www.martinruetter.com/rassekunde/rottweiler",
    },
  ],
} as Breed;
