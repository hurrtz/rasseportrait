import type { Breed } from "../../../types/breed";

export default {
  id: 336,
  details: {
    internal: "spanish_water_dog",
    public: [
      "Spanischer Wasserhund",
      "Perro de Agua Español",
      "perro Turco",
      "Türkenhund",
      "Turco Andaluz",
      "Andalusischer Türke",
    ],
  },
  classification: {
    fci: {
      group: 8,
      section: 3,
      standardNumber: 336,
    },
  },
  podcast: [
    {
      number: 85,
      episode: "Suppenattacke, Rudelbegegnung & 1 eiliger Aufruf!!",
      sources: [
        {
          url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/85-suppenattacke-rudelbegegnung-1-eiliger-aufruf-zyhm5ofxax4e1",
          type: "audio",
        },
      ],
      meta: {
        internal: "portrait",
        public: "Rasseportrait",
        timecode: 4006,
        airDate: "2022-10-27",
        isGuessable: true,
        isGuessedCorrectly: undefined,
        guessedBy: "mr",
      },
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Perro_de_Agua_Espa%C3%B1ol",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/SPANISCHER-WASSERHUND-336.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/perro-de-agua-espanol",
    },
  ],
} satisfies Breed;
