import type { Breed } from "../../../types/breed";

export default {
  id: 309,
  details: {
    internal: "shar_pei",
    public: ["Shar Pei"],
  },
  classification: {
    fci: {
      group: 2,
      section: 2,
      standardNumber: 309,
    },
  },
  podcast: [
    {
      number: 238,
      episode: "Faltenhund & Faktenflut",
      sources: [
        {
          url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/238-faltenhund-faktenflut-c8w8twnxlowab",
          type: "audio",
        },
      ],
      meta: {
        internal: "portrait",
        public: "Rasseportrait",
        timecode: 1186,
        airDate: "2025-12-04",
        isGuessable: true,
        isGuessedCorrectly: true,
        guessedBy: "mr",
      },
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Shar-Pei",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/SHAR-PEI-309.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/shar-pei",
    },
    {
      name: "Martin Rütter",
      url: "https://www.martinruetter.com/rassekunde/shar-pei",
    },
  ],
} satisfies Breed;
