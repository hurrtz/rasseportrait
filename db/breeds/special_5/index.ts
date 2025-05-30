import type { Breed } from "../../../types/breed";

export default {
  id: "special_5",
  details: {
    internal: "westfalenterrier",
    public: ["Westfalenterrier"],
  },
  classification: {
    fci: undefined,
  },
  podcast: [
    {
      number: "Exklusiv #2",
      episode: "Live-Podcast Delbrück: Therapie-Schafe & Schnaps-Hasen",
      sources: [
        {
          url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/live-podcast-delbrueck-therapie-schafe-schnaps-hasen-l8amf2kemppre",
          type: "audio",
        },
      ],
      meta: {
        internal: "portrait",
        public: "Rasseportrait",
        timecode: 4151,
        airDate: "2024-07-04",
        isGuessable: true,
        isGuessedCorrectly: true,
        guessedBy: "mr",
      },
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Westfalenterrier",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/westfalenterrier-nationale-rasse",
    },
  ],
} satisfies Breed;
