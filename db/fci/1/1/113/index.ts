import type { Breed, FCI } from "../../../../../types/breed";
import { getBreedImagePath } from "../../../../../src/utils";

const fci: FCI = {
  group: 1,
  section: 1,
  standardNumber: 113,
};

const breed: Breed = {
  names: ["Briard"],
  fci,
  image: getBreedImagePath({ ...fci }),
  podcast: [
    {
      episode: "Herbstanfang",
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/135-herbstanfang-mjmh2c8xp08jy",
      timecode: 2978,
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Briard",
    },
  ],
};

export default breed;
