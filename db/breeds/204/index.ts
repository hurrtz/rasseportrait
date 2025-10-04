import type { Breed } from "../../../types/breed";

export default {
  id: 204,
  details: {
    internal: "sabueso_espanol",
    public: ["Sabueso Español", "Spanischer Laufhund"],
    hasVideo: true,
  },
  classification: {
    fci: {
      group: 6,
      section: 1,
      standardNumber: 204,
    },
  },
  podcast: [
    {
      number: 228,
      episode: "Verona, Veggie-Futter & Vorsorge",
      sources: [
        {
          url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/228-verona-veggiefutter-vorsorge-oaudd8gdmv8ix",
          type: "audio",
        },
      ],
      meta: {
        internal: "portrait",
        public: "Rasseportrait",
        timecode: 1754,
        airDate: "2025-09-25",
        isGuessable: true,
        isGuessedCorrectly: false,
        guessedBy: "mr",
      },
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Sabueso_Español",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/SPANISCHER-LAUFHUND-204.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/sabueso-espanol",
    },
  ],
} satisfies Breed;
