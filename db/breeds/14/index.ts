import type { Breed } from "../../../types/breed";

export default {
  id: 14,
  details: {
    internal: "swedish_cattle_dog",
    public: [
      "Västgötaspets",
      "Westgotenspitz",
      "Schwedischer Schäferspitz",
      "Swedish Cattle Dog",
      "Schwedischer Vallhund",
    ],
  },
  classification: {
    fci: {
      group: 5,
      section: 3,
      standardNumber: 14,
    },
  },
  podcast: [
    {
      number: 83,
      episode: "Kriegsschrecken, Kommunikationsmöhren & falsche Schildkröten",
      sources: [
        {
          url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/83-kriegsschrecken-kommunikationsmoehren-falsche-schildkroeten-t7s7tgilkx2ql",
          type: "audio",
        },
      ],
      meta: {
        internal: "portrait",
        public: "Rasseportrait",
        timecode: 3562,
        airDate: "2022-10-13",
        isGuessable: true,
        isGuessedCorrectly: true,
        guessedBy: "mr",
      },
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/V%C3%A4stg%C3%B6taspets",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/SCHWEDISCHER-WALLHUND-14.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/vaestgoetaspets",
    },
  ],
} satisfies Breed;
