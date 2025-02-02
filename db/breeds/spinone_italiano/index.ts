import type { Breed } from "../../../types/breed";

const breed: Breed = {
  id: "spinone_italiano",
  names: [
    "Spinone Italiano",
    "Spinone",
    "Rauhaariger italienischer Vorstehhund",
    "Italian Griffon",
  ],
  wasGuessedCorrectlyInPodcast: true,
  fci: {
    group: 7,
    section: 1,
    standardNumber: 165,
  },
  podcast: [
    {
      number: "Summer Edition #1",
      episode: "Geburtstag & Good News",
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/summer-edition-1-geburtstag-good-news-8jh3dh6u48lpr",
      timecode: 1530,
      airDate: "2024-06-27",
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Spinone_Italiano",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/ITALIENISCHER-SPINONE-165.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/spinone-italiano",
    },
  ],
  recognitions: ["Dorothee, für die Korrekturvorschläge beim Spinone! 🙂"],
};

export default breed;
