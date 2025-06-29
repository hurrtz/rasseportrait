import type { Breed } from "../../../types/breed";

export default {
  id: 62,
  details: {
    internal: "styrian_coarse_haired_hound",
    public: ["Steirische Rauhhaarbracke", "Peintinger-Bracke"],
  },
  classification: {
    fci: {
      group: 6,
      section: 1,
      standardNumber: 62,
    },
  },
  podcast: [
    {
      number: "Summer Edition #9",
      episode: "Katzengefühle",
      sources: [
        {
          url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/summer-edition-9-katzengefuehle-57gluk24bflht",
          type: "audio",
        },
      ],
      meta: {
        internal: "portrait",
        public: "Rasseportrait",
        timecode: 2044,
        airDate: "2024-08-22",
        isGuessable: true,
        isGuessedCorrectly: false,
        guessedBy: "mr",
      },
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Steirische_Rauhhaarbracke",
    },
    {
      name: "FCI",
      url: "https://fci.be/de/nomenclature/STEIRISCHE-RAUHHAARBRACKE-62.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/steirische-rauhhaarbracke",
    },
  ],
  recognitions: ["Danke an Dirk für das Feedback zum Bild!"],
} as Breed;
