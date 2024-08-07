import type { Breed, FCI } from "../../../../../types/breed";
import { getBreedImagePath } from "../../../../../src/utils";

const fci: FCI = {
  group: 7,
  section: 1,
  standardNumber: 99,
};

const breed: Breed = {
  names: ["Weimaraner"],
  variants: [
    {
      names: ["Kurhaarig"],
      image: getBreedImagePath({ ...fci, variant: "short" }),
    },
    {
      names: ["Langhaarig"],
      image: getBreedImagePath({ ...fci, variant: "long" }),
    },
  ],
  fci,
  podcast: [
    {
      episode: "Richtig Helfen, fliegende Kotbeutel & der Weimaraner",
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/52-richtig-helfen-fliegende-kotbeutel-der-weimaraner-m5dz64ld7wmvh",
      timecode: 2427,
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Weimaraner",
    },
  ],
};

export default breed;
