import type { Breed, FCI } from "../../../../../types/breed";
import { getBreedImagePath } from "../../../../../src/utils";

const fci: FCI = {
  group: 2,
  section: 1,
  standardNumber: 356,
};

const { standardNumber: id } = fci;

const breed: Breed = {
  id,
  names: [
    "Dänisch-schwedischer Farmhund",
    "Dansk-Svensk Gårdhund",
    "dansk-svensk gårdshund",
    "sällskapshund",
  ],
  fci,
  image: getBreedImagePath({ ...fci }),
  podcast: [
    {
      episode: "Tierisch menschlich auf dem Kilimandscharo",
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/87-tierisch-menschlich-auf-dem-kilimandscharo-60d0fiqpcr9u0",
      timecode: 2457,
    },
    {
      episode: "Bitte nicht nachmachen!",
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/89-bitte-nicht-nachmachen-tt85sxkz7dhtd",
      timecode: 1756,
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Dansk-Svensk_G%C3%A5rdshund",
    },
  ],
};

export default breed;
