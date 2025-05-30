import type { Breed } from "../../../types/breed";

export default {
  id: 243,
  details: {
    internal: "alaskan_malamute",
    public: ["Alaskan Malamute", "Alaskischer Malamute"],
  },
  classification: {
    fci: {
      group: 5,
      section: 1,
      standardNumber: 243,
    },
  },
  podcast: [
    {
      number: 198,
      episode: "Naturstumper",
      sources: [
        {
          url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/198-der-teuerste-floh-der-welt-drn0227qdnmu2",
          type: "audio",
        },
      ],
      meta: {
        internal: "portrait",
        public: "Rasseportrait",
        timecode: 1658,
        airDate: "2024-12-26",
        isGuessable: true,
        isGuessedCorrectly: true,
        guessedBy: "mr",
      },
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Alaskan_Malamute",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/ALASKAN-MALAMUTE-243.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/alaskan-malamute",
    },
    {
      name: "Martin Rütter",
      url: "https://www.martinruetter.com/rassekunde/alaskan-malamute",
    },
  ],
} satisfies Breed;
