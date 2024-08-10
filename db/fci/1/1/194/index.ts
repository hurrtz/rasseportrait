import type { Breed, FCI } from "../../../../../types/breed";
import { getBreedImagePath } from "../../../../../src/utils";

const fci: FCI = {
  group: 1,
  section: 1,
  standardNumber: 194,
};

const { standardNumber: id } = fci;

const breed: Breed = {
  id,
  names: [
    "Bergamasker Hirtenhund",
    "Berger de bergame",
    "Cane da pastore Bergamasco",
    "Bergamasco Shepherd Dog",
    "Perro de pastor Bergamasco",
  ],
  fci,
  image: getBreedImagePath({ ...fci }),
  podcast: [
    {
      episode: "Schnitzelbankabend & Kompetenzvermutung",
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/154-schnitzelbankabend-kompetenzvermutung-k2ec0em6e8dt4",
      timecode: 568,
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Bergamasker_Hirtenhund",
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
