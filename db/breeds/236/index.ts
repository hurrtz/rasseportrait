import type { Breed } from "../../../types/breed";

export default {
  id: 236,
  details: {
    internal: "australian_silky_terrier",
    public: ["Australian Silky Terrier"],
  },
  classification: {
    fci: {
      group: 3,
      section: 4,
      standardNumber: 236,
    },
  },
  podcast: [
    {
      number: 204,
      episode: "Aktuelle Folge",
      sources: [
        {
          url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/204-hodenhochstand-7knji9zctlnlj",
          type: "audio",
        },
      ],
      meta: {
        internal: "portrait",
        public: "Rasseportrait",
        timecode: 1745,
        airDate: "2025-02-07",
        isGuessable: true,
        isGuessedCorrectly: true,
        guessedBy: "mr",
      },
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Australian_Silky_Terrier",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/AUSTRALIAN_SILKY_TERRIER-236.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/australian-silky-terrier",
    },
  ],
} as Breed;
