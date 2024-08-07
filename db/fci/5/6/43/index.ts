import type { Breed, FCI } from "../../../../../types/breed";
import { getBreedImagePath } from "../../../../../src/utils";

const fci: FCI = {
  group: 5,
  section: 6,
  standardNumber: 43,
};

const breed: Breed = {
  names: ["Basenji", "Kongo-Terrier"],
  fci,
  image: getBreedImagePath({ ...fci }),
  podcast: [
    {
      episode: "Religionskriege bei Facebook, vegane Hunde und kleine Ritter",
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/58-religionskriege-bei-facebook-vegane-hunde-und-kleine-ritter-u6g77nktkpqi2",
      timecode: 1157,
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Basenji",
    },
  ],
};

export default breed;
