import type { Breed, FCI } from "../../../../../types/breed";
import { getBreedImagePath } from "../../../../../src/utils";

const fci: FCI = {
  group: 1,
  section: 1,
  standardNumber: 15,
};

const breed: Breed = {
  names: ["Belgischer Schäferhund"],
  variants: [
    {
      names: ["Malinois", "Mechelaar"],
      image: getBreedImagePath({ ...fci, variant: "malinois" }),
    },
  ],
  fci,
  podcast: [
    {
      episode: "Tierschutzhundeverordnung, Strohhalmtest & Zwingerhaltung",
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/62-tierschutzhundeverordnung-strohhalmtest-zwingerhaltung-vbf1lpiq5foqn",
      timecode: 3729,
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Malinois",
    },
  ],
};

export default breed;
