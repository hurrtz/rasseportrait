import type { Breed } from "../../../types/breed";

export default {
  id: 345,
  details: {
    internal: "jack_russell_terrier",
    public: ["Jack Russell Terrier"],
    hasVideo: true,
    groupAs: "Russell Terriers",
  },
  classification: {
    fci: {
      group: 3,
      section: 2,
      standardNumber: 345,
    },
  },
  podcast: [
    {
      number: 233,
      episode: "Verliebt, verplant, verhunzt.",
      sources: [
        {
          url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/233-verliebt-verplant-verhunzt-88ikzih1g9717",
          type: "audio",
        },
      ],
      meta: {
        internal: "portrait",
        public: "Rasseportrait",
        timecode: 1790,
        airDate: "2025-10-29",
        isGuessable: true,
        isGuessedCorrectly: true,
        guessedBy: "mr",
      },
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Jack_Russell_Terrier",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/JACK-RUSSELL-TERRIER-345.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/jack-russell-terrier",
    },
    {
      name: "Martin Rütter",
      url: "https://www.martinruetter.com/rassekunde/jack-russell-terrier",
    },
  ],
} satisfies Breed;
