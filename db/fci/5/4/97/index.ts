import type { Breed, FCI } from "../../../../../types/breed";
import { getBreedImagePath } from "../../../../../src/utils";

const fci: FCI = {
  group: 5,
  section: 4,
  standardNumber: 97,
};

const breed: Breed = {
  names: ["Deutscher Spitz"],
  variants: [
    {
      names: ["Pomeranian", "Zwergspitz"],
      fci,
      image: getBreedImagePath({ ...fci, variant: "pomeranian" }),
    },
    {
      names: ["Kleinspitz"],
      fci,
      image: getBreedImagePath({ ...fci, variant: "miniature" }),
    },
    {
      names: ["Mittelspitz"],
      fci,
      image: getBreedImagePath({ ...fci, variant: "medium" }),
    },
    {
      names: ["Großspitz"],
      fci,
      image: getBreedImagePath({ ...fci, variant: "large" }),
    },
    {
      names: ["Wolfsspitz", "Keeshond"],
      fci,
      image: getBreedImagePath({ ...fci, variant: "keeshond" }),
    },
  ],
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
      url: "https://de.wikipedia.org/wiki/Deutsche_Spitze",
    },
  ],
};

export default breed;
