import type { Breed } from "../../../types/breed";

export default {
  id: "special_8",
  details: {
    internal: "kokoni",
    public: ["Kokoni"],
  },
  classification: {
    fci: undefined,
  },
  podcast: [
    {
      number: 187,
      episode: "Tierbegegnungen",
      sources: [
        {
          url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/187-tierbegegnungen-h4530ab2gu9v7",
          type: "audio",
        },
      ],
      meta: {
        internal: "portrait",
        public: "Rasseportrait",
        timecode: 2513,
        airDate: "2024-10-10",
        isGuessable: true,
        isGuessedCorrectly: true,
        guessedBy: "mr",
      },
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Kokoni",
    },
  ],
} satisfies Breed;
