import type { Breed } from "../../../types/breed";

export default {
  id: "special_7",
  details: {
    internal: "louisiana_catahoula_leopard_dog",
    public: ["Louisiana Catahoula Leopard Dog"],
  },
  classification: {
    fci: undefined,
  },
  podcast: [
    {
      number: 185,
      episode: "Genug ist genug",
      sources: [
        {
          url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/185-genug-ist-genug-lh5uilbydwhba",
          type: "audio",
        },
      ],
      meta: {
        internal: "portrait",
        public: "Rasseportrait",
        timecode: 2877,
        airDate: "2024-09-26",
        isGuessable: true,
        isGuessedCorrectly: true,
        guessedBy: "mr",
      },
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Louisiana_Catahoula_Leopard_Dog",
    },
    {
      name: "AKC",
      url: "https://www.akc.org/dog-breeds/catahoula-leopard-dog/",
    },
  ],
} satisfies Breed;
