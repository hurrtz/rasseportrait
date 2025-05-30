import type { Breed } from "../../../types/breed";

export default {
  id: 292,
  details: {
    internal: "pyrenean_mastiff",
    public: ["Dogo Argentino"],
  },
  classification: {
    fci: {
      group: 2,
      section: 2,
      standardNumber: 292,
    },
  },
  podcast: [
    {
      number: 64,
      episode:
        "Giftige Nüsse, Chihuahua im Rettungsdienst & Rütter als Lakritzfigur",
      sources: [
        {
          url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/64-giftige-nuesse-chihuahua-im-rettungsdienst-ruetter-als-lakritzfigur-1al7eu52bnser",
          type: "audio",
        },
      ],
      meta: {
        internal: "portrait",
        public: "Rasseportrait",
        timecode: 2551,
        airDate: "2022-06-02",
        isGuessable: true,
        isGuessedCorrectly: true,
        guessedBy: "mr",
      },
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Dogo_Argentino",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/ARGENTINISCHE-DOGGE-292.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/dogo-argentino",
    },
  ],
} satisfies Breed;
