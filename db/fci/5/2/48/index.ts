import type { Breed, FCI } from "../../../../../types/breed";
import { getBreedImagePath } from "../../../../../src/utils";

const fci: FCI = {
  group: 5,
  section: 2,
  standardNumber: 48,
};

const breed: Breed = {
  names: [
    "Karelischer Bärenhund",
    "Karjalankarhukoira",
    "Björnhund",
    "Hund der Zyrianer",
  ],
  fci,
  image: getBreedImagePath({ ...fci }),
  podcast: [
    {
      episode: "Funkstille, Fliegen & Hochstaplersyndrom",
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/132-funkstille-fliegen-hochstaplersyndrom-vw7v85dyj5wp9",
      timecode: 2264,
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Karelischer_B%C3%A4renhund",
    },
  ],
};

export default breed;