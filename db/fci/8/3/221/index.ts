import type { Breed, FCI } from "../../../../../types/breed";
import { getBreedImagePath } from "../../../../../src/utils";

const fci: FCI = {
  group: 8,
  section: 3,
  standardNumber: 221,
};

const breed: Breed = {
  names: ["Friesischer Wasserhund", "Wetterhoun"],
  fci,
  image: getBreedImagePath({ ...fci }),
  podcast: [
    {
      episode: "Ein bisschen Paloma",
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/133-ein-bisschen-paloma-189d70agws5z3",
      timecode: 2628,
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Wetterhoun",
    },
  ],
};

export default breed;
