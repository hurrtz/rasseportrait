import type { Breed } from "../../../types/breed";

export default {
  id: 285,
  details: {
    internal: "spanish_galgo",
    public: ["Galgo Español", "Galgo", "Spanischer Windhund"],
  },
  classification: {
    fci: {
      group: 10,
      section: 3,
      standardNumber: 285,
    },
  },
  podcast: [
    {
      number: 47,
      episode:
        "Das traurige Schicksal der Galgos, Conny Reimann & Mythos Wildfutter",
      sources: [
        {
          url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/47-das-traurige-schicksal-der-galgos-conny-reimann-mythos-wildfutter-qqta8btva9n8i",
          type: "audio",
        },
      ],
      meta: {
        internal: "portrait",
        public: "Rasseportrait",
        timecode: 1115,
        airDate: "2022-02-03",
        isGuessable: false,
        isGuessedCorrectly: undefined,
        guessedBy: "mr",
      },
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Galgo_Espa%C3%B1ol",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/SPANISCHER-WINDHUND-285.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/galgo-espanol",
    },
  ],
} satisfies Breed;
