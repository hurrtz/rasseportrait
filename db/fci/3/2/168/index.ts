import type { Breed, FCI } from "../../../../../types/breed";
import { getBreedImagePath } from "../../../../../src/utils";

const fci: FCI = {
  group: 3,
  section: 2,
  standardNumber: 168,
};

const { standardNumber: id } = fci;

const breed: Breed = {
  id,
  names: ["Dandie Dinmont Terrier"],
  fci,
  image: getBreedImagePath({ ...fci }),
  podcast: [
    {
      episode: "Co-Ownership & Knochen knacken",
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/139-co-ownership-knochen-knacken-3ht5yygef4ypm",
      timecode: 2909,
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Dandie_Dinmont_Terrier",
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
