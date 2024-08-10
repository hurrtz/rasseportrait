import type { Breed, FCI } from "../../../../../types/breed";
import { getBreedImagePath } from "../../../../../src/utils";

const fci: FCI = {
  group: 9,
  section: 3,
  standardNumber: 80,
};

const { standardNumber: id } = fci;

const breed: Breed = {
  id,
  names: ["Griffon Bruxellois", "Brüsseler Griffon"],
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
      url: "https://de.wikipedia.org/wiki/Griffon_Belge",
    },
    {
      name: "FCI",
      url: "",
    },
    {
      name: "VDH",
      url: "",
    },
  ],
};

export default breed;
