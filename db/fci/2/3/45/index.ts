import type { Breed, FCI } from "../../../../../types/breed";
import { getBreedImagePath } from "../../../../../src/utils";

const fci: FCI = {
  group: 2,
  section: 3,
  standardNumber: 45,
};

const { standardNumber: id } = fci;

const breed: Breed = {
  id,
  names: [
    "Berner Sennenhund",
    "Dürrbächler",
    "Bouvier bernois",
    "Bernese Mountain Dog",
    "Perro Boyero de montaña Bernés",
  ],
  fci,
  image: getBreedImagePath({ ...fci }),
  podcast: [
    {
      episode: "Hunde bei Wärme im Auto, Freiwilligendienst & leckere Häppchen",
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/69-hunde-bei-waerme-im-auto-freiwilligendienst-leckere-haeppchen-f6rev34kklaku",
      timecode: 2276,
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Berner_Sennenhund",
    },
  ],
};

export default breed;
