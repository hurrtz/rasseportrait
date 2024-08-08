import type { Breed, FCI } from "../../../../../types/breed";
import { getBreedImagePath } from "../../../../../src/utils";

const fci: FCI = {
  group: 8,
  section: 3,
  standardNumber: 124,
};

const { standardNumber: id } = fci;

const breed: Breed = {
  id,
  names: [
    "Irish Water Spaniel",
    "Irischer Wasserspaniel",
    "Perro de agua irlandés",
    "Épagneul d’eau irlandais",
  ],
  fci,
  image: getBreedImagePath({ ...fci }),
  podcast: [
    {
      episode: "Stark wie ein Regenwurm",
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/144-stark-wie-ein-regenwurm-yz5nu29vkfm1o",
      timecode: 2909,
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Irish_Water_Spaniel",
    },
  ],
};

export default breed;
