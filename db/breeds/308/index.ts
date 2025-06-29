import type { Breed } from "../../../types/breed";

export default {
  id: 308,
  details: {
    internal: "dutch_smoushond",
    public: ["Hollandse Smoushond", "Holländischer Rattler"],
  },
  classification: {
    fci: {
      group: 2,
      section: 1,
      standardNumber: 308,
    },
  },
  podcast: [
    {
      number: 190,
      episode: 'Hausfuchs! Ein Crosspodcast mit "Behind Science"',
      sources: [
        {
          url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/190-hausfuchs-ein-crosspodcast-mit-behind-science-t635dvd6wdi21",
          type: "audio",
        },
      ],
      meta: {
        internal: "portrait",
        public: "Rasseportrait",
        timecode: 315,
        airDate: "2024-10-31",
        isGuessable: true,
        isGuessedCorrectly: false,
        guessedBy: "mr",
      },
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Hollandse_Smoushond",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/HOLLANDISCHER-SMOUSHUND-308.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/hollandse-smoushond",
    },
  ],
} satisfies Breed;
