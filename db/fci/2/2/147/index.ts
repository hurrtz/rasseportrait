import type { Breed, FCI } from "../../../../../types/breed";
import { getBreedImagePath } from "../../../../../src/utils";

const fci: FCI = {
  group: 2,
  section: 2,
  standardNumber: 147,
};

const breed: Breed = {
  names: ["Rottweiler"],
  image: getBreedImagePath({ ...fci }),
  fci,
  podcast: [
    {
      episode: "Ferienfolge",
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/24-ferienfolge-lg7idzp6e0vr8",
      timecode: 275,
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Rottweiler",
    },
  ],
};

export default breed;
