import type { Breed, FCI } from "../../../../../types/breed";
import { getBreedImagePath } from "../../../../../src/utils";

const fci: FCI = {
  group: 2,
  section: 1,
  standardNumber: 181,
};

const { standardNumber: id } = fci;

const breed: Breed = {
  id,
  names: ["Riesenschnauzer"],
  fci,
  image: getBreedImagePath({ ...fci }),
  podcast: [
    {
      episode: "Welpenhändler, Zerrspiele & Spartipps Teil 2",
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/57-welpenhaendler-zerrspiele-spartipps-teil-2-it4nn687n9bsg",
      timecode: 1369,
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Schnauzer",
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
