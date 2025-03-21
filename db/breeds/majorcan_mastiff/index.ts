import type { Breed } from "../../../types/breed";

const breed: Breed = {
  id: "majorcan_mastiff",
  names: [
    "Ca de Bou",
    "Perro dogo mallorquín",
    "Perro de Presa Mallorquín",
    "Mallorca-Dogge",
    "Mallorca Mastiff",
  ],
  wasGuessedCorrectlyInPodcast: true,
  fci: {
    group: 2,
    section: 2,
    standardNumber: 249,
  },
  podcast: [
    {
      number: 167,
      episode: "Ameisen-Waschstraße",
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/167-ameisen-waschstrasse-sctwq1mdogjpv",
      timecode: 2572,
      airDate: "2024-05-23",
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Ca_de_Bou",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/MALLORCA-DOGGE-249.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/perro-dogo-mallorquin",
    },
  ],
};

export default breed;
