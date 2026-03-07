import type { Breed } from "../../../types/breed";

export default {
  id: "special_4",
  details: {
    internal: "silken_windsprite",
    public: ["Silken Windsprite", "Longhaired Whippet", "Langhaar Whippet"],
  },
  classification: {
    fci: undefined,
  },
  podcast: [
    {
      number: 165,
      episode: "Biber & Bark Date",
      sources: [
        {
          url: "https://open.spotify.com/episode/0D6fSGgeUfeTxEjblwXgec",
          type: "audio",
          provider: "spotify",
        },
        {
          url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/165-biber-bark-date-qfe8t7gfo7siq",
          type: "audio",
          provider: "rtl",
        },
      ],
      meta: {
        internal: "portrait",
        public: "Rasseportrait",
        timecode: 2178,
        airDate: "2024-05-09",
        isGuessable: true,
        isGuessedCorrectly: false,
        guessedBy: "mr",
      },
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Silken_Windsprite",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/silken-windsprite-nationale-rasse",
    },
  ],
} satisfies Breed;
