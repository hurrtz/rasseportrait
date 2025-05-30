import type { Breed } from "../../../types/breed";

export default {
  id: "special_10",
  details: {
    internal: "markiesje",
    public: ["Markiesje"],
  },
  classification: {
    fci: undefined,
  },
  podcast: [
    {
      number: 201,
      episode: "Hunde, Hysterie und Heuriger",
      sources: [
        {
          url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/201-hunde-hysterie-und-heuriger-t3vap4q0lxtuo",
          type: "audio",
        },
      ],
      meta: {
        internal: "portrait",
        public: "Rasseportrait",
        timecode: 1824,
        airDate: "2025-01-16",
        isGuessable: true,
        isGuessedCorrectly: false,
        guessedBy: "mr",
      },
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Markiesje",
    },
    {
      name: "Markiesjesvereniging",
      url: "https://www.markiesjesvereniging.nl/het-markiesje/rasstandaard.html",
    },
  ],
} satisfies Breed;
