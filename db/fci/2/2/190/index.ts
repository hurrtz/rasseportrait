import type { Breed, FCI } from "../../../../../types/breed";
import { getBreedImagePath } from "../../../../../src/utils";

const fci: FCI = {
  group: 2,
  section: 2,
  standardNumber: 190,
};

const breed: Breed = {
  names: ["Hovawart"],
  fci,
  image: getBreedImagePath({ ...fci }),
  podcast: [
    {
      episode: "Erfolg gegen den illegalen Welpenhandel!",
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/92-erfolg-gegen-den-illegalen-welpenhandel-htvdavy7w4b2r",
      timecode: 1612,
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Hovawart",
    },
  ],
};

export default breed;
