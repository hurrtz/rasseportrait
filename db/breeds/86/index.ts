import type { Breed } from "../../../types/breed";

export default {
  id: 86,
  details: {
    internal: "yorkshire_terrier",
    public: ["Yorkshire Terrier"],
  },
  classification: {
    fci: {
      group: 3,
      section: 4,
      standardNumber: 86,
    },
  },
  podcast: [
    {
      number: 84,
      episode: "Beef, vegane Wurst & Schutzhund-Training mit Nebenwirkungen",
      sources: [
        {
          url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/84-beef-vegane-wurst-schutzhund-training-mit-nebenwirkungen-dtn7aqb2nwlal",
          type: "audio",
        },
      ],
      meta: {
        internal: "portrait",
        public: "Rasseportrait",
        timecode: 2314,
        airDate: "2022-10-20",
        isGuessable: true,
        isGuessedCorrectly: true,
        guessedBy: "mr",
      },
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Yorkshire_Terrier",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/YORKSHIRE-TERRIER-86.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/yorkshire-terrier",
    },
    {
      name: "Martin Rütter",
      url: "https://www.martinruetter.com/rassekunde/yorkshire-terrier",
    },
  ],
} as Breed;
