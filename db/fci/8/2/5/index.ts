import type { Breed, FCI } from "../../../../../types/breed";
import { getBreedImagePath } from "../../../../../src/utils";

const fci: FCI = {
  group: 8,
  section: 2,
  standardNumber: 5,
};

const breed: Breed = {
  names: ["English Cocker Spaniel"],
  fci,
  image: getBreedImagePath({ ...fci }),
  podcast: [
    {
      episode: "Welpenhandel, Wolfsbegegnung & Ölkäfer",
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/113-welpenhandel-wolfsbegegnung-oelkaefer-05xtswrnw6hnb",
      timecode: 2298,
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/English_Cocker_Spaniel",
    },
  ],
};

export default breed;
