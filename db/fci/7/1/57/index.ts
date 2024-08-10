import type { Breed, FCI } from "../../../../../types/breed";
import { getBreedImagePath } from "../../../../../src/utils";

const fci: FCI = {
  group: 7,
  section: 1,
  standardNumber: 57,
};

const { standardNumber: id } = fci;

const breed: Breed = {
  id,
  names: [
    "Kurzhaariger Ungarischer Vorstehhund",
    "Rövidszőrű magyar vizsla",
    "Magyar Vizsla Kurzhaar",
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
      url: "https://de.wikipedia.org/wiki/Kurzhaariger_Ungarischer_Vorstehhund",
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
