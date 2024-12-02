import type { Breed } from "../../types/breed";

const breed: Breed = {
  id: "irish_terrier",
  names: ["Irish Terrier"],
  wasGuessedCorrectlyInPodcast: true,
  fci: {
    group: 3,
    section: 1,
    standardNumber: 139,
  },
  podcast: [
    {
      number: 106,
      episode: "Bibi & Tina, Horoskope und ein absurdes Rasse-Ranking",
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/106-bibi-tina-horoskope-und-ein-absurdes-rasse-ranking-vzrl6k8ajwg7p",
      timecode: 1890,
      airDate: "2023-03-23",
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Irish_Terrier",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/IRISCHER-TERRIER-139.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/irish-terrier",
    },
    {
      name: "Martin Rütter",
      url: "https://www.martinruetter.com/rassekunde/irish-terrier",
    },
  ],
};

export default breed;
