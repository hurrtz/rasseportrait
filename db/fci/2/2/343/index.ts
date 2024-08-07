import type { Breed, FCI } from "../../../../../types/breed";
import { getBreedImagePath } from "../../../../../src/utils";

const fci: FCI = {
  group: 2,
  section: 2,
  standardNumber: 343,
};

const breed: Breed = {
  names: ["Cane Corso Italiano"],
  fci,
  image: getBreedImagePath({ ...fci }),
  podcast: [
    {
      episode: "Blue Monday, warme Omas & Karnevalspferde",
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/97-blue-monday-warme-omas-karnevalspferde-izivqxtjko9uh",
      timecode: 702,
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Cane_Corso_Italiano",
    },
  ],
};

export default breed;
