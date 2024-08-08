import type { Breed, FCI } from "../../../../../types/breed";
import { getBreedImagePath } from "../../../../../src/utils";

const fci: FCI = {
  group: 9,
  section: 1,
  standardNumber: 283,
};

const breed: Breed = {
  names: ["Coton de Tuléar", "Baumwollhund"],
  fci,
  image: getBreedImagePath({ ...fci }),
  podcast: [
    {
      episode: "Podcast live: Entenschnabelmaulkorb",
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/126-podcast-live-entenschnabelmaulkorb-b61210fz1bl75",
      timecode: 4408,
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Coton_de_Tul%C3%A9ar",
    },
  ],
};

export default breed;
