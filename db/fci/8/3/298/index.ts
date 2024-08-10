import type { Breed, FCI } from "../../../../../types/breed";
import { getBreedImagePath } from "../../../../../src/utils";

const fci: FCI = {
  group: 8,
  section: 3,
  standardNumber: 298,
};

const { standardNumber: id } = fci;

const breed: Breed = {
  id,
  names: [
    "Lagotto Romagnolo",
    "Wasserhund der Romagna",
    "Italienischer Trüffelhund",
  ],
  fci,
  image: getBreedImagePath({ ...fci }),
  podcast: [
    {
      episode: "Fichtenflitzer, Riesenregenwurm & Kot-Tapete",
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/138-fichtenflitzer-riesenregenwurm-kot-tapete-lcq6dk9w7df3w",
      timecode: 818,
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Lagotto_Romagnolo",
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
