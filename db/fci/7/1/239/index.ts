import type { Breed, FCI } from "../../../../../types/breed";
import { getBreedImagePath } from "../../../../../src/utils";

const fci: FCI = {
  group: 7,
  section: 1,
  standardNumber: 239,
};

const breed: Breed = {
  names: [
    "Drahthaariger Ungarischer Vorstehhund",
    "Drótszőrű magyar vizsla",
    "Drahthaar Vizsla",
  ],
  fci,
  image: getBreedImagePath({ ...fci }),
  podcast: [
    {
      episode: "Richtig Helfen, fliegende Kotbeutel & der Weimaraner",
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/53-der-viszla-ein-weltrekord-gefahr-durch-magendrehung-u0o9xqbtbwfk3",
      timecode: 2414,
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Drahthaariger_Ungarischer_Vorstehhund",
    },
  ],
};

export default breed;
