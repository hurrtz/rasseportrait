import type { Breed, FCI } from "../../../../../types/breed";
import { getBreedImagePath } from "../../../../../src/utils";

const fci: FCI = {
  group: 1,
  section: 1,
  standardNumber: 166,
};

const { standardNumber: id } = fci;

const breed: Breed = {
  id,
  names: ["Deutscher Schäferhund"],
  variants: [
    {
      names: ["Stockhaar"],
      image: getBreedImagePath({ ...fci, variant: "short" }),
    },
    {
      names: ["Langstockhaar"],
      image: getBreedImagePath({ ...fci, variant: "long" }),
    },
  ],
  fci,
  podcast: [
    {
      episode:
        "Hundetraining aus der Sprühflasche, Maulkorb & der Deutsche Schäferhund",
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/55-hundetraining-aus-der-spruehflasche-maulkorb-der-deutsche-schaeferhund-v2o7yjc6mh4we",
      timecode: 1222,
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Deutscher_Sch%C3%A4ferhund",
    },
  ],
};

export default breed;
