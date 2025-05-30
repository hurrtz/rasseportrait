import type { Breed } from "../../../types/breed";

export default {
  id: 270,
  details: {
    internal: "syberian_husky",
    public: ["Syberian Husky", "Siberischer Husky"],
  },
  classification: {
    fci: {
      group: 5,
      section: 1,
      standardNumber: 270,
    },
  },
  podcast: [
    {
      number: 70,
      episode:
        "Martin wird Katzenprofi, Hitzetipps kompakt & gläserne Hundekoffer",
      sources: [
        {
          url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/70-martin-wird-katzenprofi-hitzetipps-kompakt-glaeserne-hundekoffer-ot6914r1cd1bo",
          type: "audio",
        },
      ],
      meta: {
        internal: "portrait",
        public: "Rasseportrait",
        timecode: 1324,
        airDate: "2022-07-14",
        isGuessable: true,
        isGuessedCorrectly: false,
        guessedBy: "mr",
      },
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Siberian_Husky",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/SIBERIAN-HUSKY-270.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/siberian-husky",
    },
    {
      name: "Martin Rütter",
      url: "https://www.martinruetter.com/rassekunde/siberian-husky",
    },
  ],
} satisfies Breed;
