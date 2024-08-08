import type { Breed, FCI } from "../../../../../types/breed";
import { getBreedImagePath } from "../../../../../src/utils";

const fci: FCI = {
  group: 9,
  section: 2,
  standardNumber: 172,
};

const { standardNumber: id } = fci;

const breed: Breed = {
  id,
  names: ["Pudel", "Caniche"],
  variants: [
    {
      names: ["Großpudel"],
      image: getBreedImagePath({ ...fci, variant: "standard" }),
    },
    {
      names: ["Kleinpudel"],
      image: getBreedImagePath({ ...fci, variant: "medium" }),
    },
    {
      names: ["Zwergpudel"],
      image: getBreedImagePath({ ...fci, variant: "small" }),
    },
    {
      names: ["Toy-Pudel"],
      image: getBreedImagePath({ ...fci, variant: "toy" }),
    },
  ],
  fci,
  podcast: [
    {
      episode: "Leben und leben lassen",
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/13-leben-und-leben-lassen-23n9dglym2zxx",
      timecode: 3557,
    },
    {
      episode: "Wenn Nachrichten Angst machen",
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/51-wenn-nachrichten-angst-machen-eay4li7j9ucbk",
      timecode: 1812,
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Pudel",
    },
  ],
};

export default breed;
