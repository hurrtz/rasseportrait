import type { Breed, FCI } from "../../../../../types/breed";
import { getBreedImagePath } from "../../../../../src/utils";

const fci: FCI = {
  group: 4,
  section: 1,
  standardNumber: 148,
};

const breed: Breed = {
  names: ["Dackel", "Teckel", "Dachshund"],
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
      names: ["Rauhaar"],
      image: getBreedImagePath({ ...fci, variant: "wire" }),
    },
  ],
  fci,
  podcast: [
    {
      episode: "Martin wird aufgemischt, krumme Dackelbeine & Spartipps Teil 1",
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/56-martin-wird-aufgemischt-krumme-dackelbeine-spartipps-teil-1-6g11t4rkl512j",
      timecode: 1570,
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Dackel",
    },
  ],
};

export default breed;
