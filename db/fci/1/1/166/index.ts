import type { Breed, FCI } from "../../../../../types/breed";
import { getBreedImagePath } from "../../../../../src/utils";

const fci: FCI = {
  group: 1,
  section: 1,
  standardNumber: 166,
};

const breed: Breed = {
  names: ["Deutscher Schäferhund"],
  variants: [
    {
      names: ["Stockhaar"],
      image: getBreedImagePath({ ...fci, variant: "short" }),
    },
    {
      names: ["Langstockhaar"],
      image: getBreedImagePath({ ...fci, variant: "long" }),
    },
  ],
  fci,
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
      url: "https://de.wikipedia.org/wiki/Deutscher_Sch%C3%A4ferhund",
    },
  ],
};

export default breed;
