import type { Breed } from "../../../types/breed";

export default {
  id: 283,
  details: {
    internal: "coton_de_tulear",
    public: ["Coton de Tuléar", "Baumwollhund"],
  },
  classification: {
    fci: {
      group: 9,
      section: 1,
      standardNumber: 283,
    },
  },
  podcast: [
    {
      number: 126,
      episode: "Podcast live: Entenschnabelmaulkorb",
      sources: [
        {
          url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/126-podcast-live-entenschnabelmaulkorb-b61210fz1bl75",
          type: "audio",
        },
      ],
      meta: {
        internal: "portrait",
        public: "Rasseportrait",
        timecode: 4408,
        airDate: "2023-08-10",
        isGuessable: true,
        isGuessedCorrectly: true,
        guessedBy: "mr",
      },
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Coton_de_Tul%C3%A9ar",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/COTON-DE-TULEAR-283.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/coton-de-tulear",
    },
  ],
} satisfies Breed;
