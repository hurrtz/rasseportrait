import type { Breed, FCI } from "../../../../../types/breed";
import { getBreedImagePath } from "../../../../../src/utils";

const fci: FCI = {
  group: 3,
  section: 1,
  standardNumber: 40,
};

const { standardNumber: id } = fci;

const breed: Breed = {
  id,
  names: ["Irish Soft Coated Wheaten Terrier"],
  fci,
  image: getBreedImagePath({ ...fci }),
  podcast: [
    {
      episode: "Fischklingel, Osterfeuer & Weizenfarbe",
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/159-fischklingel-osterfeuer-weizenfarbe-o1tpe1gkh4pyu",
      timecode: 2012,
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Irish_Soft_Coated_Wheaten_Terrier",
    },
  ],
};

export default breed;