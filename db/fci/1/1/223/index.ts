import type { Breed, FCI } from "../../../../../types/breed";
import { getBreedImagePath } from "../../../../../src/utils";

const fci: FCI = {
  group: 1,
  section: 1,
  standardNumber: 223,
};

const breed: Breed = {
  names: ["Hollandse Herdershond", "Holländischer Schäferhund", "Herder"],
  variants: [
    {
      names: ["Kurzhaar"],
      image: getBreedImagePath({ ...fci, variant: "short" }),
    },
    {
      names: ["Langhaar"],
      image: getBreedImagePath({ ...fci, variant: "long" }),
    },
    {
      names: ["Rauhhaar"],
      image: getBreedImagePath({ ...fci, variant: "rough" }),
    },
  ],
  fci,
  podcast: [
    {
      episode: "Summer Edition #4: Körper kräftig, aber nicht ohne Adel!",
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/summer-edition-4-koerper-kraeftig-aber-nicht-ohne-adel-zjwmcmhv4vzuh",
      timecode: 123,
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Hollandse_Herdershond",
    },
  ],
};

export default breed;
