import type { Breed } from "../../../types/breed";

export default {
  id: "special_9",
  details: {
    internal: "kuhhund",
    public: ["Kuhhund", "Westerwälder Kuhhund", "Siegerländer Kuhhund"],
  },
  classification: {
    fci: undefined,
  },
  podcast: [
    {
      number: 197,
      episode: "Naturstumper",
      sources: [
        {
          url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/197-naturstumper-dsjc2lg3wwjlx",
          type: "audio",
        },
      ],
      meta: {
        internal: "portrait",
        public: "Rasseportrait",
        timecode: 1193,
        airDate: "2024-12-19",
        isGuessable: true,
        isGuessedCorrectly: true,
        guessedBy: "mr",
      },
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Kuhhund",
    },
    {
      name: "GEH",
      url: "https://www.g-e-h.de/rassebeschreibungen/46-hunde/89-westerwaelder-kuhhund",
    },
  ],
} satisfies Breed;
