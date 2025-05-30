import type { Breed } from "../../../types/breed";

export default {
  id: 111,
  details: {
    internal: "golden_retriever",
    public: ["Golden Retriever"],
  },
  classification: {
    fci: {
      group: 8,
      section: 1,
      standardNumber: 111,
    },
  },
  podcast: [
    {
      number: 101,
      episode: "Jubiläumsfolge live aus dem Walfisch",
      sources: [
        {
          url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/101-jubilaeumsfolge-live-aus-dem-walfisch-du0ci4j36ofr2",
          type: "audio",
        },
      ],
      meta: {
        internal: "portrait",
        public: "Rasseportrait",
        timecode: 2983,
        airDate: "2023-02-16",
        isGuessable: true,
        isGuessedCorrectly: true,
        guessedBy: "mr",
      },
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Golden_Retriever",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/GOLDEN-RETRIEVER-111.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/golden-retriever",
    },
    {
      name: "Martin Rütter",
      url: "https://www.martinruetter.com/rassekunde/golden-retriever",
    },
  ],
} as Breed;
