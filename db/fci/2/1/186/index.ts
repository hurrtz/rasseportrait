import type { Breed, FCI } from "../../../../../types/breed";
import { getBreedImagePath } from "../../../../../src/utils";

const fci: FCI = {
  group: 2,
  section: 1,
  standardNumber: 186,
};

const breed: Breed = {
  names: ["Affenpinscher"],
  fci,
  image: getBreedImagePath({ ...fci }),
  podcast: [
    {
      episode:
        "Ein Keks mit Folgen, Körpersprache für Hunde & schöne Geschenke",
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/65-ein-keks-mit-folgen-koerpersprache-fuer-hunde-schoene-geschenke-362zgzakgwpmb",
      timecode: 2909,
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Affenpinscher",
    },
  ],
};

export default breed;
