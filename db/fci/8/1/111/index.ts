import type { Breed, FCI } from "../../../../../types/breed";
import { getBreedImagePath } from "../../../../../src/utils";

const fci: FCI = {
  group: 8,
  section: 1,
  standardNumber: 111,
};

const { standardNumber: id } = fci;

const breed: Breed = {
  id,
  names: ["Golden Retriever"],
  fci,
  image: getBreedImagePath({ ...fci }),
  podcast: [
    {
      episode: "Jubiläumsfolge live aus dem Walfisch",
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/101-jubilaeumsfolge-live-aus-dem-walfisch-du0ci4j36ofr2",
      timecode: 2983,
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Golden_Retriever",
    },
    {
      name: "FCI",
      url: "",
    },
    {
      name: "VDH",
      url: "",
    },
  ],
};

export default breed;
