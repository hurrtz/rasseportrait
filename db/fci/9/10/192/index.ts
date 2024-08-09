import type { Breed, FCI } from "../../../../../types/breed";
import { getBreedImagePath } from "../../../../../src/utils";

const fci: FCI = {
  group: 9,
  section: 10,
  standardNumber: 192,
};

const { standardNumber: id } = fci;

const breed: Breed = {
  id,
  names: ["Kromfohrländer"],
  variants: [
    {
      names: ["Rauhhaar"],
      image: getBreedImagePath({ ...fci, variant: "wire" }),
    },
    {
      names: ["Glatthaar"],
      image: getBreedImagePath({ ...fci, variant: "smooth" }),
    },
  ],
  fci,
  podcast: [
    {
      episode: "Ebay, Aquadom & Frohe Weihnachten",
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/93-ebay-aquadom-frohe-weihnachten-vunq6bh8makya",
      timecode: 1733,
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Kromfohrl%C3%A4nder",
    },
  ],
};

export default breed;
