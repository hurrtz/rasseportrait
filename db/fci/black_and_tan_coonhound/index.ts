import type { Breed } from "../../../types/breed";

const breed: Breed = {
  id: "black_and_tan_coonhound",
  names: ["Black and Tan Coonhound", "Schwarz-roter Waschbärenhund"],
  fci: {
    group: 6,
    section: 1,
    standardNumber: 300,
  },
  podcast: [
    {
      number: 155,
      episode: "Biologisch logisch",
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/155-biologisch-logisch-ssywwck5le064",
      timecode: 1245,
      airDateTimestamp: 1709168400000,
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Black_and_Tan_Coonhound",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/SCHWARZ-LOHFARBENER-WASCHBARENHUND-300.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/black-and-tan-coonhound",
    },
  ],
};

export default breed;
