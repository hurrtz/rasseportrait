import type { Breed, FCI } from "../../../../../types/breed";
import { getBreedImagePath } from "../../../../../src/utils";

const fci: FCI = {
  group: 3,
  section: 1,
  standardNumber: 71,
};

const { standardNumber: id } = fci;

const breed: Breed = {
  id,
  names: ["Manchester Terrier"],
  fci,
  image: getBreedImagePath({ ...fci }),
  podcast: [
    {
      episode: "Rattenfänger",
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/158-rattenfaenger-2gvydqa8svsq9",
      timecode: 2985,
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://en.wikipedia.org/wiki/Manchester_Terrier",
    },
  ],
};

export default breed;
