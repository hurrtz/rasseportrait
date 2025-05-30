import type { Breed } from "../../../types/breed";

export default {
  id: "special_1",
  details: {
    internal: "elo",
    public: ["Elo"],
  },
  classification: {
    fci: undefined,
  },
  podcast: [
    {
      number: 32,
      episode: "Elos, eckige Hühner & blutrünstige Nutrias",
      sources: [
        {
          url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/32-elos-eckige-huehner-blutruenstige-nutrias-cn96yspmq7wbu",
          type: "audio",
        },
      ],
      meta: {
        internal: "portrait",
        public: "Rasseportrait",
        timecode: 676,
        airDate: "2021-10-19",
        isGuessable: undefined,
        isGuessedCorrectly: undefined,
        guessedBy: undefined,
      },
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Elo_(Hunderasse)",
    },
    {
      name: "Martin Rütter",
      url: "https://www.martinruetter.com/rassekunde/elo",
    },
  ],
} satisfies Breed;
