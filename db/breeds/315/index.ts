import type { Breed } from "../../../types/breed";

export default {
  id: 315,
  details: {
    internal: "danish_mastiff",
    public: ["Broholmer"],
  },
  classification: {
    fci: {
      group: 2,
      section: 2,
      standardNumber: 315,
    },
  },
  podcast: [
    {
      number: 82,
      episode: "Schönheit, Wahn & arme Schweine",
      sources: [
        {
          url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/82-schoenheit-wahn-arme-schweine-a9icwiyr0ey7v",
          type: "audio",
        },
      ],
      meta: {
        internal: "portrait",
        public: "Rasseportrait",
        timecode: 2869,
        airDate: "2022-10-06",
        isGuessable: true,
        isGuessedCorrectly: true,
        guessedBy: "mr",
      },
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Broholmer",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/BROHOLMER-315.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/broholmer",
    },
  ],
} satisfies Breed;
