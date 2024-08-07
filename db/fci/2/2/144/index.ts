import type { Breed, FCI } from "../../../../../types/breed";
import { getBreedImagePath } from "../../../../../src/utils";

const fci: FCI = {
  group: 2,
  section: 2,
  standardNumber: 144,
};

const { standardNumber: id } = fci;

const breed: Breed = {
  id,
  names: ["Deutscher Boxer", "Boxer"],
  fci,
  image: getBreedImagePath({ ...fci }),
  podcast: [
    {
      episode: "Ticketbetrug, Fakeprofile & Schadstoffe im Hundespielzeug",
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/80-ticketbetrug-fakeprofile-schadstoffe-im-hundespielzeug-3s90k5fnxokpg",
      timecode: 2742,
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Deutscher_Boxer",
    },
  ],
};

export default breed;
