import type { Breed } from "../../../types/breed";

export default {
  id: 230,
  details: {
    internal: "tibetan_mastiff",
    public: ["Do Khyi", "Tibetanische Dogge", "Tibetdogge", "Tibetmastiff"],
  },
  classification: {
    fci: {
      group: 2,
      section: 2,
      standardNumber: 230,
    },
  },
  podcast: [
    {
      number: 118,
      episode: "Getreidefreie Folge",
      sources: [
        {
          url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/118-getreidefreie-folge-usumre6izvygu",
          type: "audio",
        },
      ],
      meta: {
        internal: "portrait",
        public: "Rasseportrait",
        timecode: 1499,
        airDate: "2023-06-15",
        isGuessable: true,
        isGuessedCorrectly: true,
        guessedBy: "mr",
      },
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Do_Khyi",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/DO-KHYI-230.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/do-khyi",
    },
  ],
} as Breed;
