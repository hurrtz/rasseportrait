import type { Breed, FCI } from "../../../../../types/breed";
import { getBreedImagePath } from "../../../../../src/utils";

const fci: FCI = {
  group: 9,
  section: 4,
  standardNumber: 288,
};

const breed: Breed = {
  names: ["Chinesischer Schopfhund"],
  variants: [
    {
      names: ["Haarlos"],
      image: getBreedImagePath({ ...fci, variant: "hairless" }),
    },
    {
      names: ["Powder Puff"],
      image: getBreedImagePath({ ...fci, variant: "powderpuff" }),
    },
  ],
  fci,
  podcast: [
    {
      episode: "Oh, wie schön ist Panama",
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/123-oh-wie-schoen-ist-panama-92aq873dx2z0n",
      timecode: 1907,
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Chinesischer_Schopfhund",
    },
  ],
};

export default breed;
