import type { Breed, FCI } from "../../../types/breed";
import { getBreedImagePath } from "../../../src/utils";

const fci: FCI = {
  group: 5,
  section: 1,
  standardNumber: 212,
};

const { standardNumber: id } = fci;

const breed: Breed = {
  id,
  names: ["Samojede", "Samojedenhund", "Samojedenspitz"],
  fci,
  image: getBreedImagePath({ ...fci }),
  podcast: [
    {
      number: 100,
      episode: "Wolfskralle, dicke Hunde & sprechende Pflanzen",
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/100-wolfskralle-dicke-hunde-sprechende-pflanzen-wat87q06xwqct",
      timecode: 1891,
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
  ],
};

export default breed;