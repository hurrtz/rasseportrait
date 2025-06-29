import type { Breed } from "../../../types/breed";

export default {
  id: 122,
  details: {
    internal: "labrador_retriever",
    public: ["Labrador Retriever"],
  },
  classification: {
    fci: {
      group: 8,
      section: 1,
      standardNumber: 122,
    },
  },
  podcast: [
    {
      number: 94,
      episode: "Menschen, Biber, Emotionen",
      sources: [
        {
          url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/94-menschen-biber-emotionen-qm9qeqv1xrlas",
          type: "audio",
        },
      ],
      meta: {
        internal: "portrait",
        public: "Rasseportrait",
        timecode: 5465,
        airDate: "2022-12-29",
        isGuessable: true,
        isGuessedCorrectly: true,
        guessedBy: "mr",
      },
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Labrador_Retriever",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/LABRADOR-RETRIEVER-122.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/labrador-retriever",
    },
    {
      name: "Martin Rütter",
      url: "https://www.martinruetter.com/rassekunde/labrador-retriever",
    },
  ],
} as Breed;
