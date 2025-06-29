import type { Breed } from "../../../types/breed";

export default {
  id: 161,
  details: {
    internal: "beagle",
    public: ["Beagle"],
  },
  classification: {
    fci: {
      group: 6,
      section: 1,
      standardNumber: 161,
    },
  },
  podcast: [
    {
      number: 45,
      episode: "ASMR, Beagle und Wombatkacke",
      sources: [
        {
          url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/45-asmr-beagle-und-wombatkacke-iesctegwj6jg6",
          type: "audio",
        },
      ],
      meta: {
        internal: "portrait",
        public: "Rasseportrait",
        timecode: 1009,
        airDate: "2022-01-20",
        isGuessable: false,
        isGuessedCorrectly: undefined,
        guessedBy: "mr",
      },
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Beagle_(Hunderasse)",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/BEAGLE-161.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/beagle",
    },
    {
      name: "Martin Rütter",
      url: "https://www.martinruetter.com/rassekunde/beagle",
    },
  ],
} as Breed;
