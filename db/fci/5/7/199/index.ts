import type { Breed, FCI } from "../../../../../types/breed";
import { getBreedImagePath } from "../../../../../src/utils";

const fci: FCI = {
  group: 5,
  section: 7,
  standardNumber: 199,
};

const breed: Breed = {
  names: ["Cirneco dell’Etna"],
  fci,
  image: getBreedImagePath({ ...fci }),
  podcast: [
    {
      episode: "Bulette & Bier",
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/110-bulette-bier-evkbrps47ac2f",
      timecode: 1555,
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Cirneco_dell%E2%80%99Etna",
    },
  ],
};

export default breed;
