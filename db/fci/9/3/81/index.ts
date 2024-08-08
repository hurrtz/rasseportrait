import type { Breed, FCI } from "../../../../../types/breed";
import { getBreedImagePath } from "../../../../../src/utils";

const fci: FCI = {
  group: 9,
  section: 3,
  standardNumber: 81,
};

const { standardNumber: id } = fci;

const breed: Breed = {
  id,
  names: ["Griffon Belge", "Belgischer Griffon", "Brabanter Griffon"],
  fci,
  image: getBreedImagePath({ ...fci }),
  podcast: [
    {
      episode: "Garnelenfieber",
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/156-garnelenfieber-xhvk5s6b64dc4",
      timecode: 1860,
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Petit_Braban%C3%A7on",
    },
  ],
};

export default breed;
