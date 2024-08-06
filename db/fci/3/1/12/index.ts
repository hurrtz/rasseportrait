import type { Breed, FCI } from "../../../../../types/breed";
import { getBreedImagePath } from "../../../../../src/utils";

const fci: FCI = {
  group: 3,
  section: 1,
  standardNumber: 12,
};

const breed: Breed = {
  names: ["Foxterrier", "Fox Terrier"],
  variants: [
    {
      names: ["Glatthaar", "Kurzhaar"],
      fci,
      image: getBreedImagePath({ ...fci, variant: "smooth" }),
    },
  ],
  podcast: [
    {
      episode: "Summer Edition #3: Martins Solo-Folge",
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/summer-edition-3-martins-solo-folge-tfmv41s6tzg65",
      timecode: 123,
    },
    {
      episode: "Summer Edition #5: Grausame Natur",
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/summer-edition-5-grausame-natur-2cmtu8gbfflgx",
      timecode: 123,
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Foxterrier",
    },
  ],
};

export default breed;
