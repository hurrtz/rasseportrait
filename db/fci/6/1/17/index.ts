import type { Breed, FCI } from "../../../../../types/breed";
import { getBreedImagePath } from "../../../../../src/utils";

const fci: FCI = {
  group: 6,
  section: 1,
  standardNumber: 17,
};

const breed: Breed = {
  names: ["Griffon Nivernais"],
  fci,
  image: getBreedImagePath({ ...fci }),
  podcast: [
    {
      episode: "Eine Laune der Natur",
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/150-eine-laune-der-natur-urjn3ugdyex4s",
      timecode: 2507,
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Griffon_Nivernais",
    },
  ],
};

export default breed;
