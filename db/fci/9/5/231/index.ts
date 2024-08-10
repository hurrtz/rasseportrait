import type { Breed, FCI } from "../../../../../types/breed";
import { getBreedImagePath } from "../../../../../src/utils";

const fci: FCI = {
  group: 9,
  section: 5,
  standardNumber: 231,
};

const { standardNumber: id } = fci;

const breed: Breed = {
  id,
  names: [
    "Tibet-Spaniel",
    "Tibetan Spaniel",
    "Épagneul tibétain",
    "Spaniel tibetano",
    "Spaniel del Tibet",
  ],
  fci,
  image: getBreedImagePath({ ...fci }),
  podcast: [
    {
      episode: "Summer Edition #6: Junger Mann zum Mitreisen gesucht!",
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/summer-edition-6-junger-mann-zum-mitreisen-gesucht-oxv9o45d8w0ad",
      timecode: 1089,
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Tibet-Spaniel",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/TIBET-SPANIEL-231.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/tibet-spaniel",
    },
  ],
};

export default breed;
