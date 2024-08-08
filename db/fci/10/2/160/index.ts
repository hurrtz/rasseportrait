import type { Breed, FCI } from "../../../../../types/breed";
import { getBreedImagePath } from "../../../../../src/utils";

const fci: FCI = {
  group: 10,
  section: 2,
  standardNumber: 160,
};

const { standardNumber: id } = fci;

const breed: Breed = {
  id,
  names: ["Irischer Wolfshund", "Irish Wolfhound"],
  fci,
  image: getBreedImagePath({ ...fci }),
  podcast: [
    {
      episode: "Faultiere, Hitzschlag & Leben nach dem Tod",
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/75-faultiere-hitzschlag-leben-nach-dem-tod-rqnqcr03z9fmo",
      timecode: 2544,
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Irischer_Wolfshund",
    },
  ],
};

export default breed;
