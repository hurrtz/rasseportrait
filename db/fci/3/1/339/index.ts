import type { Breed, FCI } from "../../../../../types/breed";
import { getBreedImagePath } from "../../../../../src/utils";

const fci: FCI = {
  group: 3,
  section: 1,
  standardNumber: 339,
};

const breed: Breed = {
  names: ["Parson Russell Terrier"],
  fci,
  image: getBreedImagePath({ ...fci }),
  podcast: [
    {
      episode: "Kampf der Urzeitkrebse",
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/125-kampf-der-urzeitkrebse-i8h9g7dvtu49g",
      timecode: 2081,
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Parson_Russell_Terrier",
    },
  ],
};

export default breed;