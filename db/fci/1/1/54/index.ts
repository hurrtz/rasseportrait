import type { Breed, FCI } from "../../../../../types/breed";
import { getBreedImagePath } from "../../../../../src/utils";

const fci: FCI = {
  group: 1,
  section: 1,
  standardNumber: 54,
};

const breed: Breed = {
  names: ["Kuvasz"],
  fci,
  image: getBreedImagePath({ ...fci }),
  podcast: [
    {
      episode: "Toadzilla, Tierhandel bei Ebay & Fischloopings",
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/98-toadzilla-tierhandel-bei-ebay-fischloopings-3ajopzugmpayq",
      timecode: 1987,
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Kuvasz",
    },
  ],
};

export default breed;
