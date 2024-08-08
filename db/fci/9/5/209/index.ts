import type { Breed, FCI } from "../../../../../types/breed";
import { getBreedImagePath } from "../../../../../src/utils";

const fci: FCI = {
  group: 9,
  section: 5,
  standardNumber: 209,
};

const { standardNumber: id } = fci;

const breed: Breed = {
  id,
  names: ["Tibet-Terrier", "Tibetan Terrier", "Tsang Apso"],
  fci,
  image: getBreedImagePath({ ...fci }),
  podcast: [
    {
      episode: "Ein Helm für Chihuahuas, Kack-Typen & Mähroboter",
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/61-ein-helm-fuer-chihuahuas-kack-typen-maehroboter-jd7qib7z8uurv",
      timecode: 2589,
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Tibet-Terrier",
    },
  ],
};

export default breed;
