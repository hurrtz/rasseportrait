import type { Breed, FCI } from "../../../../../types/breed";
import { getBreedImagePath } from "../../../../../src/utils";

const fci: FCI = {
  group: 6,
  section: 1,
  standardNumber: 294,
};

const { standardNumber: id } = fci;

const breed: Breed = {
  id,
  names: ["Otterhund"],
  fci,
  image: getBreedImagePath({ ...fci }),
  podcast: [
    {
      episode: "Otterjagd & Dackelkatzen",
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/157-otterjagd-dackelkatzen-jfhrn0c2yrt91",
      timecode: 2238,
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Otterhund",
    },
  ],
};

export default breed;