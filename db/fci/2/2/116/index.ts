import type { Breed, FCI } from "../../../../../types/breed";
import { getBreedImagePath } from "../../../../../src/utils";

const fci: FCI = {
  group: 2,
  section: 2,
  standardNumber: 116,
};

const breed: Breed = {
  names: ["Bordeauxdogge", "Dogue de Bordeaux"],
  fci,
  image: getBreedImagePath({ ...fci }),
  podcast: [
    {
      episode: "Einfach machen",
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/114-einfach-machen-t8x681865vs1g",
      timecode: 3349,
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Dogue_de_Bordeaux",
    },
  ],
};

export default breed;