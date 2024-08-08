import type { Breed, FCI } from "../../../../../types/breed";
import { getBreedImagePath } from "../../../../../src/utils";

const fci: FCI = {
  group: 1,
  section: 2,
  standardNumber: 38,
};

const { standardNumber: id } = fci;

const breed: Breed = {
  id,
  names: ["Welsh Corgi Cardigan"],
  image: getBreedImagePath({ ...fci }),
  fci,
  podcast: [
    {
      episode: "Hundeparfüm, „Die Unvermittelbaren“ & der Corgi",
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/50-hundeparfuem-die-unvermittelbaren-der-corgi-fkny11pjvlp4x",
      timecode: 2925,
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Welsh_Corgi_Cardigan",
    },
  ],
};

export default breed;
