import type { Breed, FCI } from "../../../../../types/breed";
import { getBreedImagePath } from "../../../../../src/utils";

const fci: FCI = {
  group: 5,
  section: 4,
  standardNumber: 97,
};

const { standardNumber: id } = fci;

const breed: Breed = {
  id,
  names: ["Deutscher Spitz"],
  variants: [
    {
      names: ["Pomeranian", "Zwergspitz"],
      image: getBreedImagePath({ ...fci, variant: "pomeranian" }),
    },
    {
      names: ["Kleinspitz"],
      image: getBreedImagePath({ ...fci, variant: "miniature" }),
    },
    {
      names: ["Mittelspitz"],
      image: getBreedImagePath({ ...fci, variant: "medium" }),
    },
    {
      names: ["Großspitz"],
      image: getBreedImagePath({ ...fci, variant: "large" }),
    },
    {
      names: ["Wolfsspitz", "Keeshond"],
      image: getBreedImagePath({ ...fci, variant: "keeshound" }),
    },
  ],
  fci,
  podcast: [
    {
      episode: "Der Spitz, Zwingerhaltung & Puddingmatten",
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/49-der-spitz-zwingerhaltung-puddingmatten-7hsefpcuadjr7",
      timecode: 924,
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Deutsche_Spitze",
    },
  ],
};

export default breed;
