import type { Breed } from "../../../types/breed";

export default {
  id: 145,
  details: {
    internal: "leonberger",
    public: ["Leonberger"],
  },
  classification: {
    fci: {
      group: 2,
      section: 2,
      standardNumber: 145,
    },
  },
  podcast: [
    {
      number: 111,
      episode: '"Hundjes", Schreckreiz & Italopop',
      sources: [
        {
          url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/111-hundjes-schreckreiz-italopop-ba9cvkn3rq8je",
          type: "audio",
        },
      ],
      meta: {
        internal: "portrait",
        public: "Rasseportrait",
        timecode: 2505,
        airDate: "2023-04-27",
        isGuessable: true,
        isGuessedCorrectly: true,
        guessedBy: "mr",
      },
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Leonberger",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/LEONBERGER-145.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/leonberger",
    },
    {
      name: "Martin Rütter",
      url: "https://www.martinruetter.com/rassekunde/leonberger",
    },
  ],
} as Breed;
