import type { Breed } from "../../../types/breed";

const breed: Breed = {
  id: "samoyed_dog",
  names: ["Samojede", "Samojedenhund", "Samojedenspitz"],
  wasGuessedCorrectlyInPodcast: true,
  fci: {
    group: 5,
    section: 1,
    standardNumber: 212,
  },
  podcast: [
    {
      number: 100,
      episode: "Wolfskralle, dicke Hunde & sprechende Pflanzen",
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/100-wolfskralle-dicke-hunde-sprechende-pflanzen-wat87q06xwqct",
      timecode: 1891,
      airDate: "2023-02-09",
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Samojede_(Hunderasse)",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/SAMOJEDE-212.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/samojede",
    },
    {
      name: "Martin Rütter",
      url: "https://www.martinruetter.com/rassekunde/samojede",
    },
  ],
};

export default breed;
