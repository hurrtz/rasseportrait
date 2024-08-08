import type { Breed, FCI } from "../../../../../types/breed";
import { getBreedImagePath } from "../../../../../src/utils";

const fci: FCI = {
  group: 9,
  section: 6,
  standardNumber: 218,
};

const { standardNumber: id } = fci;

const breed: Breed = {
  id,
  names: ["Chihuahua", "Techichi", "Chihuahueño"],
  fci,
  variants: [
    {
      names: ["kurzhaarig"],
      image: getBreedImagePath({ ...fci, variant: "short" }),
    },
    {
      names: ["langhaarig"],
      image: getBreedImagePath({ ...fci, variant: "long" }),
    },
  ],
  podcast: [
    {
      episode: "Zuchtverbote, Eutrophierung & Helmpflicht für Chihuahuas",
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/48-zuchtverbote-eutrophierung-helmpflicht-fuer-chihuahuas-532onwpr31v22",
      timecode: 2362,
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Chihuahua_(Hunderasse)",
    },
  ],
};

export default breed;
