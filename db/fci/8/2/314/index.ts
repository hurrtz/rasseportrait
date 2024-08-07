import type { Breed, FCI } from "../../../../../types/breed";
import { getBreedImagePath } from "../../../../../src/utils";

const fci: FCI = {
  group: 8,
  section: 2,
  standardNumber: 314,
};

const breed: Breed = {
  names: ["Nederlandse Kooikerhondje"],
  fci,
  image: getBreedImagePath({ ...fci }),
  podcast: [
    {
      episode: "Ferien, Strohmann-Argumente & eine rätselhafte Hunderasse",
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/73-ferien-strohmann-argumente-eine-raetselhafte-hunderasse-1x9e06d6pxpnr",
      timecode: 2269,
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Nederlandse_Kooikerhondje",
    },
  ],
};

export default breed;
