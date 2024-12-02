import type { Breed } from "../../types/breed";

const breed: Breed = {
  id: "dobermann",
  names: ["Dobermann"],
  wasGuessedCorrectlyInPodcast: true,
  fci: {
    group: 2,
    section: 1,
    standardNumber: 143,
  },
  podcast: [
    {
      number: 81,
      episode: "New York, Husumer Protestschwein, Kupierte Ohren",
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/81-new-york-husumer-protestschwein-kupierte-ohren-exok0jysekhyi",
      timecode: 2776,
      airDate: "2022-09-29",
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Dobermann",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/DOBERMANN-143.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/dobermann",
    },
    {
      name: "Martin Rütter",
      url: "https://www.martinruetter.com/rassekunde/dobermann",
    },
  ],
};

export default breed;
