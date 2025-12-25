import type { Breed } from "../../../types/breed";

export default {
  id: 349,
  details: {
    internal: "mioritic",
    public: ["Ciobănesc Românesc Mioritic", "Mioritic", "Mocano", "Barac"],
  },
  classification: {
    fci: {
      group: 1,
      section: 1,
      standardNumber: 349,
    },
  },
  podcast: [
    {
      number: 239,
      episode: "Platz im Podcast",
      sources: [
        {
          url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/239-platz-im-podcast-vo3xigbhpf84s",
          type: "audio",
        },
      ],
      meta: {
        internal: "portrait",
        public: "Rasseportrait",
        timecode: 1207,
        airDate: "2025-12-11",
        isGuessable: true,
        isGuessedCorrectly: false,
        guessedBy: "mr",
      },
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Ciobănesc_Românesc_Mioritic",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/CIOBANESC-ROMANESC-MIORITIC-349.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/ciobanesc-romanesc-mioritic",
    },
  ],
} satisfies Breed;
