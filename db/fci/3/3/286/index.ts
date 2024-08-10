import type { Breed, FCI } from "../../../../../types/breed";
import { getBreedImagePath } from "../../../../../src/utils";

const fci: FCI = {
  group: 3,
  section: 3,
  standardNumber: 286,
};

const { standardNumber: id } = fci;

const breed: Breed = {
  id,
  names: ["American Staffordshire Terrier", "Amstaff"],
  fci,
  image: getBreedImagePath({ ...fci }),
  podcast: [
    {
      episode:
        "Starke Frauen, eine blutige Nase & der American Staffordshire Terrier",
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/54-starke-frauen-eine-blutige-nase-der-american-staffordshire-terrier-5u9lggnny8ey9",
      timecode: 1200,
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/American_Staffordshire_Terrier",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/AMERICAN-STAFFORDSHIRE-TERRIER-286.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/american-staffordshire-terrier",
    },
  ],
};

export default breed;
