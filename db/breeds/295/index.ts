import type { Breed } from "../../../types/breed";

export default {
  id: 295,
  details: {
    internal: "harrier",
    public: ["Harrier"],
  },
  classification: {
    fci: {
      group: 6,
      section: 1,
      standardNumber: 295,
    },
  },
  podcast: [
    {
      number: 212,
      episode: "Tourfinale, Garnelen und Stelzenhunde",
      sources: [
        {
          url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/212-tourfinale-garnelen-und-stelzenhunde-n9b80w9jjgd0f",
          type: "audio",
        },
      ],
      meta: {
        internal: "portrait",
        public: "Rasseportrait",
        timecode: 963,
        airDate: "2025-04-04",
        isGuessable: true,
        isGuessedCorrectly: false,
        guessedBy: "mr",
      },
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Harrier_(Hunderasse)",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/HARRIER-295.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/harrier",
    },
  ],
} satisfies Breed;
