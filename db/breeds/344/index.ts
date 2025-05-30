import type { Breed } from "../../../types/breed";

export default {
  id: 344,
  details: {
    internal: "american_akita",
    public: [
      "Amerikanischer Akita",
      "Great Japanese Dog",
      "Großer Japanischer Hund",
    ],
  },
  classification: {
    fci: {
      group: 5,
      section: 5,
      standardNumber: 344,
    },
  },
  podcast: [
    {
      number: "Summer Edition #7",
      episode: "Hobby Horsing for Olympia!",
      sources: [
        {
          url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/summer-edition-7-hobby-horsing-for-olympia-7pbpazh2zvi72",
          type: "audio",
        },
      ],
      meta: {
        internal: "portrait",
        public: "Rasseportrait",
        timecode: 1075,
        airDate: "2024-08-08",
        isGuessable: true,
        isGuessedCorrectly: true,
        guessedBy: "mr",
      },
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Amerikanischer_Akita",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/AMERIKANISCHER-AKITA-344.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/amerikanischer-akita",
    },
  ],
} satisfies Breed;
