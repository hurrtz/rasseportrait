import type { Breed, FCI } from "../../../../../types/breed";
import { getBreedImagePath } from "../../../../../src/utils";

const fci: FCI = {
  group: 5,
  section: 5,
  standardNumber: 291,
};

const breed: Breed = {
  names: ["Eurasier"],
  fci,
  image: getBreedImagePath({ ...fci }),
  podcast: [
    {
      episode: "Lost in the Sauerland, Boris Becker & Hunderassen-Studie",
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/60-lost-in-the-sauerland-boris-becker-hunderassen-studie-qgpee4hjubcmh",
      timecode: 2079,
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Eurasier_(Hunderasse)",
    },
  ],
};

export default breed;