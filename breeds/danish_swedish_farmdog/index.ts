import type { Breed } from "../../types/breed";

const breed: Breed = {
  id: "danish_swedish_farmdog",
  names: [
    "Dänisch-schwedischer Farmhund",
    "Dansk-Svensk Gårdhund",
    "dansk-svensk gårdshund",
    "sällskapshund",
    "Danski",
  ],
  wasGuessedCorrectlyInPodcast: true,
  fci: {
    group: 2,
    section: 1,
    standardNumber: 356,
  },
  podcast: [
    {
      number: 87,
      episode: "Tierisch menschlich auf dem Kilimandscharo",
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/87-tierisch-menschlich-auf-dem-kilimandscharo-60d0fiqpcr9u0",
      timecode: 2457,
      airDate: "2022-11-10",
    },
    {
      number: 89,
      episode: "Bitte nicht nachmachen!",
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/89-bitte-nicht-nachmachen-tt85sxkz7dhtd",
      timecode: 1756,
      airDate: "2022-11-24",
      context: "Nachtrag zum «Tierisch menschlich auf dem Kilimandscharo»",
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Dansk-Svensk_G%C3%A5rdshund",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/DANISCH-SCHWEDISCHER-FARMHUND-356.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/danish-swedish-farmdog",
    },
  ],
};

export default breed;
