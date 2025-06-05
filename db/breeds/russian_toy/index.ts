import type { Breed } from "../../../types/breed";

const breed: Breed = {
  id: "russian_toy",
  names: [
    "Russkiy Toy",
    "Russischer Toy",
    "Russischer Zwergspaniel",
    "московский длинношерстный той-терьер",
  ],
  variants: [
    {
      id: "long",
      names: ["Moskauer Langhaariger Toy"],
      furtherReading: [
        {
          name: "VDH",
          url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/russkiy-toy-langhaar",
        },
      ],
    },
    {
      id: "smooth",
      names: ["Kurzhaar"],
      furtherReading: [
        {
          name: "VDH",
          url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/russkiy-toy-kurzhaar",
        },
      ],
    },
  ],
  wasGuessedCorrectlyInPodcast: true,
  fci: {
    group: 9,
    section: 9,
    standardNumber: 352,
  },
  podcast: [
    {
      number: 220,
      episode: "Baumpilze, Bambus und Bauchtasche",
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/220-baumpilze-bambus-und-bauchtasche-r7fuvdbl5qzec",
      timecode: 2053,
      airDate: "2025-06-05",
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Russkiy_Toy",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/RUSSISCHER-TOY-352.html",
    },
  ],
};

export default breed;
