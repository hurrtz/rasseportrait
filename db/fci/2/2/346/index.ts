import type { Breed, FCI } from "../../../../../types/breed";
import { getBreedImagePath } from "../../../../../src/utils";

const fci: FCI = {
  group: 2,
  section: 2,
  standardNumber: 346,
};

const breed: Breed = {
  names: ["Presa Canario", "Kanarische Dogge", "Dogo Canario"],
  fci,
  image: getBreedImagePath({ ...fci }),
  podcast: [
    {
      episode: "Giftwarnung, Zeckenspray & Hühner-Hacks",
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/141-giftwarnung-zeckenspray-huehner-hacks-gds039ru762p9",
      timecode: 2594,
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Presa_Canario",
    },
  ],
};

export default breed;
