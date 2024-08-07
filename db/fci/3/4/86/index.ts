import type { Breed, FCI } from "../../../../../types/breed";
import { getBreedImagePath } from "../../../../../src/utils";

const fci: FCI = {
  group: 3,
  section: 4,
  standardNumber: 86,
};

const { standardNumber: id } = fci;

const breed: Breed = {
  id,
  names: ["Yorkshire Terrier"],
  fci,
  image: getBreedImagePath({ ...fci }),
  podcast: [
    {
      episode: "Beef, vegane Wurst & Schutzhund-Training mit Nebenwirkungen",
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/84-beef-vegane-wurst-schutzhund-training-mit-nebenwirkungen-dtn7aqb2nwlal",
      timecode: 2314,
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Yorkshire_Terrier",
    },
  ],
};

export default breed;
