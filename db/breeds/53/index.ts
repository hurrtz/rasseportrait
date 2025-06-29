import type { Breed } from "../../../types/breed";

export default {
  id: 53,
  details: {
    internal: "komondor",
    public: ["Komondor"],
  },
  classification: {
    fci: {
      group: 1,
      section: 1,
      standardNumber: 53,
    },
  },
  podcast: [
    {
      number: 127,
      episode: "Podcast live II: Achterbahn der Feelings",
      sources: [
        {
          url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/127-podcast-live-ii-achterbahn-der-feelings-kk19bjk32yh1x",
          type: "audio",
        },
      ],
      meta: {
        internal: "portrait",
        public: "Rasseportrait",
        timecode: 985,
        airDate: "2023-08-17",
        isGuessable: true,
        isGuessedCorrectly: true,
        guessedBy: "mr",
      },
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Komondor",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/KOMONDOR-53.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/komondor",
    },
  ],
} as Breed;
