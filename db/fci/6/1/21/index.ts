import type { Breed, FCI } from "../../../../../types/breed";
import { getBreedImagePath } from "../../../../../src/utils";

const fci: FCI = {
  group: 6,
  section: 1,
  standardNumber: 21,
};

const { standardNumber: id } = fci;

const breed: Breed = {
  id,
  names: ["Gascon Saintongeois"],
  variants: [
    {
      names: ["Petit"],
      image: getBreedImagePath({ ...fci }),
    },
    {
      names: ["Grand"],
      image: getBreedImagePath({ ...fci }),
    },
  ],
  fci,
  podcast: [
    {
      episode: "Einfach mal sitzen",
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/129-einfach-mal-sitzen-dbc2cl161xydt",
      timecode: 1132,
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Grand_Gascon_Saintongeois",
    },
  ],
};

export default breed;
