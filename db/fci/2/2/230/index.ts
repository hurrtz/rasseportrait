import type { Breed, FCI } from "../../../../../types/breed";
import { getBreedImagePath } from "../../../../../src/utils";

const fci: FCI = {
  group: 2,
  section: 2,
  standardNumber: 230,
};

const breed: Breed = {
  names: ["Tibetanische Dogge", "Do Khyi", "Tibetdogge", "Tibetmastiff"],
  fci,
  image: getBreedImagePath({ ...fci }),
  podcast: [
    {
      episode: "Getreidefreie Folge",
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/118-getreidefreie-folge-usumre6izvygu",
      timecode: 1499,
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Do_Khyi",
    },
  ],
};

export default breed;
