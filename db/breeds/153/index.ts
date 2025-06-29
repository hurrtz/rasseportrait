import type { Breed } from "../../../types/breed";

export default {
  id: 153,
  details: {
    internal: "dalmatian_dog",
    public: ["Dalmatiner"],
  },
  classification: {
    fci: {
      group: 6,
      section: 3,
      standardNumber: 153,
    },
  },
  podcast: [
    {
      number: 12,
      episode: "Die ganze Wahrheit",
      sources: [
        {
          url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/12-die-ganze-wahrheit-kc3oyphk7j1ra",
          type: "audio",
        },
      ],
      meta: {
        internal: "personal_anecdote",
        public: "Persönliche Anekdote",
        timecode: 890,
        airDate: "2021-05-25",
        isGuessable: undefined,
        isGuessedCorrectly: undefined,
        guessedBy: undefined,
      },
    },
    {
      number: 105,
      episode: "Geiselnahme, skurrile Wildtiere & 1,5 Grad wärmer",
      sources: [
        {
          url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/105-geiselnahme-skurrile-wildtiere-1-5-grad-waermer-9qzro9uynb4pc",
          type: "audio",
        },
      ],
      meta: {
        internal: "portrait",
        public: "Rasseportrait",
        timecode: 3565,
        airDate: "2023-03-16",
        isGuessable: true,
        isGuessedCorrectly: true,
        guessedBy: "mr",
      },
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Dalmatiner",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/DALMATINER-153.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/dalmatiner",
    },
    {
      name: "Martin Rütter",
      url: "https://www.martinruetter.com/rassekunde/dalmatiner-1",
    },
  ],
} as Breed;
