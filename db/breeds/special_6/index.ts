import type { Breed } from "../../../types/breed";

export default {
  id: "special_6",
  details: {
    internal: "bolonka_zwetna",
    public: ["Bolonka Zwetna", "Tsvetnaya Bolonka"],
  },
  classification: {
    fci: undefined,
  },
  podcast: [
    {
      number: "Summer Edition #8",
      episode: "Die schlauesten Tiere der Welt",
      sources: [
        {
          url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/summer-edition-8-die-schlauesten-tiere-der-welt-febovvjxrpps9",
          type: "audio",
        },
      ],
      meta: {
        internal: "portrait",
        public: "Rasseportrait",
        timecode: 1030,
        airDate: "2024-08-15",
        isGuessable: true,
        isGuessedCorrectly: true,
        guessedBy: "mr",
      },
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Bolonka_Zwetna",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/bolonka-zwetna-nationale-rasse",
    },
    {
      name: "Martin Rütter",
      url: "https://www.martinruetter.com/ratgeber/rassekunde/bolonka-zwetna",
    },
  ],
  recognitions: ["Robin, für den Tipp, das Bild zu verbessern!"],
} satisfies Breed;
