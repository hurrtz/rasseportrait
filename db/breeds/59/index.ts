import type { Breed } from "../../../types/breed";

const breed: Breed = {
  id: "schweizer_laufhund",
  names: ["Schweizer Laufhund", "Chien Courant Suisse"],
  variants: [
    {
      names: [
        "Berner Laufhund",
        "Courant bernois",
        "Bernese Hound",
        "Sabueso Bernés",
      ],
      id: "berner",
      furtherReading: [
        {
          name: "Wikipedia",
          url: "https://de.wikipedia.org/wiki/Berner_Laufhund",
        },
        {
          name: "VDH",
          url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/berner-laufhund",
        },
      ],
    },
    {
      names: [
        "Jura Laufhund",
        "Bruno du Jura",
        "Jura Hound",
        "Sabueso del Jura",
      ],
      id: "jura",
      furtherReading: [
        {
          name: "Wikipedia",
          url: "https://de.wikipedia.org/wiki/Jura_Laufhund",
        },
        {
          name: "VDH",
          url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/jura-laufhund",
        },
      ],
    },
    {
      names: [
        "Luzerner Laufhund",
        "Blausprenkel",
        "Courant lucernois",
        "Lucerne Hound",
        "Sabueso de Lucerna",
      ],
      id: "luzerner",
      furtherReading: [
        {
          name: "Wikipedia",
          url: "https://de.wikipedia.org/wiki/Luzerner_Laufhund",
        },
        {
          name: "VDH",
          url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/luzerner-laufhund",
        },
      ],
    },
    {
      names: [
        "Schwyzer Laufhund",
        "Rotschecke",
        "Courant schwytzois",
        "Schwyz Hound",
        "Sabueso de Schwyz",
      ],
      id: "schwyzer",
      furtherReading: [
        {
          name: "Wikipedia",
          url: "https://de.wikipedia.org/wiki/Schwyzer_Laufhund",
        },
        {
          name: "VDH",
          url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/schwyzer-laufhund",
        },
      ],
    },
  ],
  wasGuessedCorrectlyInPodcast: true,
  fci: {
    group: 6,
    section: 1,
    standardNumber: 59,
  },
  podcast: [
    {
      number: 214,
      episode: "Lasst mich bei den Affen!",
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/214-lasst-mich-bei-den-affen-lmh9y9fj3f4ar",
      timecode: 1567,
      airDate: "2025-04-25",
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Schweizer_Laufhund",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/IRISCHER-ROTER-SETTER-120.html",
    },
  ],
};

export default breed;
