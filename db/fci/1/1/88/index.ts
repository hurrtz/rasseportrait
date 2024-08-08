import type { Breed, FCI } from "../../../../../types/breed";
import { getBreedImagePath } from "../../../../../src/utils";

const fci: FCI = {
  group: 1,
  section: 1,
  standardNumber: 88,
};

const { standardNumber: id } = fci;

const breed: Breed = {
  id,
  names: ["Shetland Sheepdog"],
  fci,
  image: getBreedImagePath({ ...fci }),
  podcast: [
    {
      episode: "Parlamentskreis Hund",
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/153-parlamentskreis-hund-yijtj5yrhqgo1",
      timecode: 2232,
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Shetland_Sheepdog",
    },
  ],
};

export default breed;
