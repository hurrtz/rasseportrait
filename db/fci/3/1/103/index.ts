import type { Breed, FCI } from "../../../../../types/breed";
import { getBreedImagePath } from "../../../../../src/utils";

const fci: FCI = {
  group: 3,
  section: 1,
  standardNumber: 103,
};

const { standardNumber: id } = fci;

const breed: Breed = {
  id,
  names: ["Deutscher Jagdterrier"],
  fci,
  image: getBreedImagePath({ ...fci }),
  podcast: [
    {
      episode:
        "Ein Keks mit Folgen, Körpersprache für Hunde & schöne Geschenke",
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/65-ein-keks-mit-folgen-koerpersprache-fuer-hunde-schoene-geschenke-362zgzakgwpmb",
      timecode: 2331,
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Deutscher_Jagdterrier",
    },
  ],
};

export default breed;