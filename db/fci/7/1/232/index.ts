import type { Breed, FCI } from "../../../../../types/breed";
import { getBreedImagePath } from "../../../../../src/utils";

const fci: FCI = {
  group: 7,
  section: 1,
  standardNumber: 232,
};

const { standardNumber: id } = fci;

const breed: Breed = {
  id,
  names: ["Deutsch Stichelhaar"],
  fci,
  image: getBreedImagePath({ ...fci }),
  podcast: [
    {
      episode: "Gute Reflexe, schlechte Reflexe",
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/163-gute-reflexe-schlechte-reflexe-pbp0znipifura",
      timecode: 2947,
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Deutsch_Stichelhaar",
    },
  ],
};

export default breed;
