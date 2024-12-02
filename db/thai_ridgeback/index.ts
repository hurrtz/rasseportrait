import type { Breed } from "../../types/breed";

const breed: Breed = {
  id: "thai_ridgeback",
  names: ["Thai Ridgeback"],
  wasGuessedCorrectlyInPodcast: true,
  fci: {
    group: 5,
    section: 7,
    standardNumber: 338,
  },
  podcast: [
    {
      number: "Summer Edition #10",
      episode: "Stabile Typen",
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/summer-edition-10-stabile-typen-4s4s3dlg5jjyi",
      timecode: 1008,
      airDate: "2024-08-29",
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Thai_Ridgeback",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/THAILAND-RIDGEBACK-338.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/thai-ridgeback-dog",
    },
  ],
};

export default breed;
