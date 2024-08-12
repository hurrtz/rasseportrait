import type { Breed, FCI } from "../../../types/breed";
import { getBreedImagePath } from "../../../src/utils";

const fci: FCI = {
  group: 7,
  section: 1,
  standardNumber: 165,
};

const { standardNumber: id } = fci;

const breed: Breed = {
  id,
  names: [
    "Spinone Italiano",
    "Spinone",
    "Rauhaariger italienischer Vorstehhund",
    "Italian Griffon",
  ],
  fci,
  image: getBreedImagePath({ ...fci }),
  podcast: [
    {
      number: "Summer Edition #1",
      episode: "Geburtstag & Good News",
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/summer-edition-1-geburtstag-good-news-8jh3dh6u48lpr",
      timecode: 1,
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Berger_de_Picardie",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/ITALIENISCHER-SPINONE-165.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/spinone-italiano",
    },
  ],
};

export default breed;
