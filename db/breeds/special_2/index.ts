import type { Breed } from "../../../types/breed";

export default {
  id: "special_2",
  details: {
    internal: "turnspit",
    public: [
      "Turnspit",
      "Turnspit Dog",
      "Kitchen Dog",
      "Cooking Dog",
      "Underdog",
      "Canis vertigus",
      "Vernepator",
      "Küchenhund",
    ],
  },
  classification: {
    fci: undefined,
  },
  podcast: [
    {
      number: 91,
      episode: "Vorsicht vor Weihnachten",
      sources: [
        {
          url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/91-vorsicht-vor-weihnachten-8afvekcm6qtq4",
          type: "audio",
        },
      ],
      meta: {
        internal: "portrait",
        public: "Rasseportrait",
        timecode: 1762,
        airDate: "2022-12-08",
        isGuessable: true,
        isGuessedCorrectly: false,
        guessedBy: "mr",
      },
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Turnspit_Dog",
    },
  ],
} satisfies Breed;
