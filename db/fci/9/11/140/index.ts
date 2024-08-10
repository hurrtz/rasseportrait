import type { Breed, FCI } from "../../../../../types/breed";
import { getBreedImagePath } from "../../../../../src/utils";

const fci: FCI = {
  group: 9,
  section: 11,
  standardNumber: 140,
};

const { standardNumber: id } = fci;

const breed: Breed = {
  id,
  names: ["Boston Terrier"],
  fci,
  image: getBreedImagePath({ ...fci }),
  podcast: [
    {
      episode: "Wettkampfdruck & Dackelverbot",
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/160-wettkampfdruck-dackelverbot-u55fefrt71llx",
      timecode: 3220,
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Boston_Terrier",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/BOSTON-TERRIER-140.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/boston-terrier",
    },
  ],
};

export default breed;
