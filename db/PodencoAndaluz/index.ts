import type { Breed, FCI } from "../../types/breed";
import { getBreedImagePath } from "../../src/utils";

const fci: FCI = {
  group: -1,
  section: -1,
  standardNumber: -1,
};

const breed: Breed = {
  names: ["Podenco Andaluz"],
  image: getBreedImagePath({ ...fci, breedName: "PodencoAndaluz" }),
  fci,
  podcast: [
    {
      episode: "Glow down, Hund & Baby, Lösseler Waldgeist",
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/59-glow-down-hund-baby-loesseler-waldgeist-qthfcbunlahuh",
      timecode: 3885,
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Podenco_Andaluz",
    },
  ],
};

export default breed;
