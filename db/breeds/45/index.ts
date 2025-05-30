import type { Breed } from "../../../types/breed";

export default {
  id: 45,
  details: {
    internal: "bernese_mountain_dog",
    public: [
      "Berner Sennenhund",
      "Dürrbächler",
      "Bouvier bernois",
      "Bernese Mountain Dog",
      "Perro Boyero de montaña Bernés",
    ],
  },
  classification: {
    fci: {
      group: 2,
      section: 3,
      standardNumber: 45,
    },
  },
  podcast: [
    {
      number: 69,
      episode: "Hunde bei Wärme im Auto, Freiwilligendienst & leckere Häppchen",
      sources: [
        {
          url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/69-hunde-bei-waerme-im-auto-freiwilligendienst-leckere-haeppchen-f6rev34kklaku",
          type: "audio",
        },
      ],
      meta: {
        internal: "portrait",
        public: "Rasseportrait",
        timecode: 2276,
        airDate: "2022-07-07",
        isGuessable: true,
        isGuessedCorrectly: true,
        guessedBy: "mr",
      },
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Berner_Sennenhund",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/BERNER-SENNENHUND-45.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/berner-sennenhund",
    },
    {
      name: "Martin Rütter",
      url: "https://www.martinruetter.com/rassekunde/berner-sennenhund",
    },
  ],
} as Breed;
