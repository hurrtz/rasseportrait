import type { Breed } from "../../../types/breed";

export default {
  id: 88,
  details: {
    internal: "shetland_sheepdog",
    public: ["Shetland Sheepdog", "Sheltie"],
  },
  classification: {
    fci: {
      group: 1,
      section: 1,
      standardNumber: 88,
    },
  },
  podcast: [
    {
      number: 153,
      episode: "Parlamentskreis Hund",
      sources: [
        {
          url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/153-parlamentskreis-hund-yijtj5yrhqgo1",
          type: "audio",
        },
      ],
      meta: {
        internal: "portrait",
        public: "Rasseportrait",
        timecode: 2232,
        airDate: "2024-02-15",
        isGuessable: true,
        isGuessedCorrectly: true,
        guessedBy: "mr",
      },
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Shetland_Sheepdog",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/SHETLAND-SHEEPDOG-88.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/sheltie-shetland-sheepdog",
    },
    {
      name: "Martin Rütter",
      url: "https://www.martinruetter.com/rassekunde/shetland-sheepdog-sheltie",
    },
  ],
} as Breed;
