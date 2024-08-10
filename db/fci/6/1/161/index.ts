import type { Breed, FCI } from "../../../../../types/breed";
import { getBreedImagePath } from "../../../../../src/utils";

const fci: FCI = {
  group: 6,
  section: 1,
  standardNumber: 161,
};

const { standardNumber: id } = fci;

const breed: Breed = {
  id,
  names: ["Beagle"],
  fci,
  image: getBreedImagePath({ ...fci }),
  podcast: [
    {
      episode: "ASMR, Beagle und Wombatkacke",
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/45-asmr-beagle-und-wombatkacke-iesctegwj6jg6",
      timecode: 1009,
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Beagle_(Hunderasse)",
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
