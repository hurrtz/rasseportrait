import type { Breed } from "../../../types/breed";

export default {
  id: 360,
  details: {
    internal: "lancashire_heeler",
    public: ["Lancashire Heeler", "Ormskirk Heeler"],
  },
  classification: {
    fci: {
      group: 1,
      section: 1,
      standardNumber: 360,
    },
  },
  podcast: [
    {
      number: "Exklusiv #3",
      episode: "Live-Podcast Köln: Die große Überraschung",
      sources: [
        {
          url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/live-podcast-koeln-die-grosse-ueberraschung-fd8vbp81ih11w",
          type: "audio",
        },
        {
          url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/live-podcast-koeln-die-grosse-ueberraschung-fd8vbp81ih11w",
          type: "video",
        },
      ],
      meta: {
        internal: "portrait",
        public: "Rasseportrait",
        timecode: 1586,
        airDate: "2024-09-12",
        isGuessable: true,
        isGuessedCorrectly: false,
        guessedBy: "mr",
      },
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Lancashire_Heeler",
    },
    {
      name: "FCI",
      url: "https://fci.be/de/nomenclature/LANCASHIRE-HEELER-360.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/lancashire-heeler",
    },
  ],
} satisfies Breed;
