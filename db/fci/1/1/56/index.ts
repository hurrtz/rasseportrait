import type { Breed, FCI } from "../../../../../types/breed";
import { getBreedImagePath } from "../../../../../src/utils";

const fci: FCI = {
  group: 1,
  section: 1,
  standardNumber: 56,
};

const breed: Breed = {
  names: ["Pumi"],
  fci,
  image: getBreedImagePath({ ...fci }),
  podcast: [
    {
      episode: "Beamende Zecken, Kalsarikännit & Hundeduft",
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/128-beamende-zecken-kalsarikaennit-hundeduft-6vu1gxku02uiq",
      timecode: 1803,
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Pumi_(Hunderasse)",
    },
  ],
};

export default breed;
