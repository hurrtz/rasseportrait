import type { Breed, FCI } from "../../../../../types/breed";
import { getBreedImagePath } from "../../../../../src/utils";

const fci: FCI = {
  group: 5,
  section: 4,
  standardNumber: 257,
};

const { standardNumber: id } = fci;

const breed: Breed = {
  id,
  names: ["Shiba", "Shiba Inu"],
  fci,
  image: getBreedImagePath({ ...fci }),
  podcast: [
    {
      episode: "",
      url: "",
      timecode: 0,
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Shiba",
    },
  ],
};

export default breed;
