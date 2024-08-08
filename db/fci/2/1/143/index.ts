import type { Breed, FCI } from "../../../../../types/breed";
import { getBreedImagePath } from "../../../../../src/utils";

const fci: FCI = {
  group: 2,
  section: 1,
  standardNumber: 143,
};

const { standardNumber: id } = fci;

const breed: Breed = {
  id,
  names: ["Dobermann"],
  fci,
  image: getBreedImagePath({ ...fci }),
  podcast: [
    {
      episode: "New York, Husumer Protestschwein, Kupierte Ohren",
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/81-new-york-husumer-protestschwein-kupierte-ohren-exok0jysekhyi",
      timecode: 2776,
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Dobermann",
    },
  ],
};

export default breed;
