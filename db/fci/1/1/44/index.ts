import type { Breed, FCI } from "../../../../../types/breed";
import { getBreedImagePath } from "../../../../../src/utils";

const fci: FCI = {
  group: 1,
  section: 1,
  standardNumber: 44,
};

const breed: Breed = {
  names: ["Beauceron", "Berger de Beauce", "Chien de Beauce", "Bas-Rouge"],
  fci,
  image: getBreedImagePath({ ...fci }),
  podcast: [
    {
      episode: "Es ist zu warm",
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/120-es-ist-zu-warm-02gkj0kij1nng",
      timecode: 2295,
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Beauceron",
    },
  ],
};

export default breed;
