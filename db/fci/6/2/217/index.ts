import type { Breed, FCI } from "../../../../../types/breed";
import { getBreedImagePath } from "../../../../../src/utils";

const fci: FCI = {
  group: 6,
  section: 2,
  standardNumber: 217,
};

const { standardNumber: id } = fci;

const breed: Breed = {
  id,
  names: ["Bayerischer Gebirgsschweißhund"],
  fci,
  image: getBreedImagePath({ ...fci }),
  podcast: [
    {
      episode: "Morbus Bahlsen & Acoustic Kitty",
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/121-morbus-bahlsen-acoustic-kitty-qdz3pnuu3ngfr",
      timecode: 4346,
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Bayerischer_Gebirgsschwei%C3%9Fhund",
    },
  ],
};

export default breed;