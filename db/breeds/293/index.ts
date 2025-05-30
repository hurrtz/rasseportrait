import type { Breed } from "../../../types/breed";

export default {
  id: 293,
  details: {
    internal: "australian_kelpie",
    public: [
      "Australian Kelpie",
      "Kelpie",
      "Australischer Schäferhund",
      "Australian Sheepdog",
      "Barb",
    ],
  },
  classification: {
    fci: {
      group: 1,
      section: 1,
      standardNumber: 293,
    },
  },
  podcast: [
    {
      number: 122,
      episode: "Kurioser Unfall, Katzenbegegnungen & Fledermausbomben",
      sources: [
        {
          url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/122-kurioser-unfall-katzenbegegnungen-fledermausbomben-vdy2nybu1xoqm",
          type: "audio",
        },
      ],
      meta: {
        internal: "portrait",
        public: "Rasseportrait",
        timecode: 2632,
        airDate: "2023-07-13",
        isGuessable: true,
        isGuessedCorrectly: true,
        guessedBy: "mr",
      },
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Australian_Kelpie",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/AUSTRALIAN-KELPIE-293.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/australian-kelpie",
    },
    {
      name: "Martin Rütter",
      url: "https://www.martinruetter.com/rassekunde/australian-kelpie",
    },
  ],
} satisfies Breed;
