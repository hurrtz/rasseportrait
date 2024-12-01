import type { Breed } from "../../types/breed";

const breed: Breed = {
  id: "bavarian_mountain_hound",
  names: ["Bayerischer Gebirgsschweißhund"],
  wasGuessedCorrectlyInPodcast: true,
  fci: {
    group: 6,
    section: 2,
    standardNumber: 217,
  },
  podcast: [
    {
      number: 121,
      episode: "Morbus Bahlsen & Acoustic Kitty",
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/121-morbus-bahlsen-acoustic-kitty-qdz3pnuu3ngfr",
      timecode: 4346,
      airDate: "2023-07-06",
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Bayerischer_Gebirgsschwei%C3%9Fhund",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/BAYERISCHER-GEBIRGSSCHWEISSHUND-217.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/bayerischer-gebirgsschweisshund",
    },
  ],
};

export default breed;
