import type { Breed } from "../../../types/breed";

export default {
  id: 241,
  details: {
    internal: "erdelyi_kopo",
    public: ["Erdélyi Kopó", "Ungarische Bracke", "Transylvanischer Laufhund"],
  },
  classification: {
    fci: {
      group: 6,
      section: 1,
      standardNumber: 241,
    },
  },
  podcast: [
    {
      number: 16,
      episode: "Das Letzte vor dem Sommer",
      sources: [
        {
          url: "https://open.spotify.com/episode/0WKGDbZMSj8F8JGD16C5by",
          type: "audio",
          provider: "spotify",
        },
      ],
      meta: {
        internal: "portrait",
        public: "Rasseportrait",
        timecode: 1886,
        airDate: "2026-06-11",
        isGuessable: true,
        isGuessedCorrectly: false,
        guessedBy: "mr",
      },
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Erdélyi_Kopó",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/UNGARISCHE-BRACKE-TRANSYLVANISCHER-LAUFHUND-241.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/erdelyi-kopo",
    },
  ],
} satisfies Breed;
