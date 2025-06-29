import type { Breed } from "../../../types/breed";

export default {
  id: 271,
  details: {
    internal: "bearded_collie",
    public: [
      "Bearded Collie",
      "Mongrel",
      "Mouled Dog",
      "beardie",
      "Mountain Collie",
      "Hairy Mou'ed Collie",
      "Highland Collie",
      "Mountain Collie",
    ],
  },
  classification: {
    fci: {
      group: 1,
      section: 1,
      standardNumber: 271,
    },
  },
  podcast: [
    {
      number: 195,
      episode: "Frau mit Rollkoffer",
      sources: [
        {
          url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/195-frau-mit-rollkoffer-7exy0vywl69i9",
          type: "audio",
        },
      ],
      meta: {
        internal: "portrait",
        public: "Rasseportrait",
        timecode: 2557,
        airDate: "2024-12-05",
        isGuessable: true,
        isGuessedCorrectly: true,
        guessedBy: "mr",
      },
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Bearded_Collie",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/BEARDED-COLLIE-271.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/bearded-collie",
    },
    {
      name: "Martin Rütter",
      url: "https://www.martinruetter.com/rassekunde/bearded-collie",
    },
  ],
} satisfies Breed;
