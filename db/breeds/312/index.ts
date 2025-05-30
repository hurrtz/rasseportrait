import type { Breed } from "../../../types/breed";

export default {
  id: 312,
  details: {
    internal: "nova_scotia_duck_tolling_retriever",
    public: ["Nova Scotia Duck Tolling Retriever"],
  },
  classification: {
    fci: {
      group: 8,
      section: 1,
      standardNumber: 312,
    },
  },
  podcast: [
    {
      number: 136,
      episode: "Positive Verstärkung, Männergrippe & Zurückrudern",
      sources: [
        {
          url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/136-positive-verstaerkung-maennergrippe-zurueckrudern-pcewcbc9hru3t",
          type: "audio",
        },
      ],
      meta: {
        internal: "portrait",
        public: "Rasseportrait",
        timecode: 1380,
        airDate: "2023-10-19",
        isGuessable: true,
        isGuessedCorrectly: true,
        guessedBy: "mr",
      },
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Nova_Scotia_Duck_Tolling_Retriever",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/NOVA-SCOTIA-RETRIEVER-312.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/nova-scotia-duck-tolling-retriever",
    },
    {
      name: "Martin Rütter",
      url: "https://www.martinruetter.com/rassekunde/nova-scotia-duck-tolling-retriever",
    },
  ],
} satisfies Breed;
