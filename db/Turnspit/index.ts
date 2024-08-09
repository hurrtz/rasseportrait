import type { Breed, FCI } from "../../types/breed";
import { getBreedImagePath } from "../../src/utils";

const fci: FCI = {
  group: -1,
  section: -1,
  standardNumber: -1,
};

const breed: Breed = {
  id: "turnspit",
  names: [
    "Turnspit",
    "Turnspit Dog",
    "Kitchen Dog",
    "Cooking Dog",
    "Underdog",
    "Canis vertigus",
    "Vernepator",
    "Küchenhund",
  ],
  image: getBreedImagePath({ ...fci, breedName: "turnspit" }),
  fci,
  podcast: [
    {
      episode: "Vorsicht vor Weihnachten",
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/91-vorsicht-vor-weihnachten-8afvekcm6qtq4",
      timecode: 1762,
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Turnspit_Dog",
    },
  ],
};

export default breed;
