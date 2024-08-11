import type { Breed, FCI } from "../../../../../types/breed";
import { getBreedImagePath } from "../../../../../src/utils";

const fci: FCI = {
  group: 5,
  section: 7,
  standardNumber: 329,
};

const { standardNumber: id } = fci;

const breed: Breed = {
  id,
  names: ["Podenco Canario", "Kanarischer Podenco"],
  fci,
  image: getBreedImagePath({ ...fci }),
  podcast: [
    {
      number: 59,
      episode: "Glow down, Hund & Baby, Lösseler Waldgeist",
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/59-glow-down-hund-baby-loesseler-waldgeist-qthfcbunlahuh",
      timecode: 3885,
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Podenco_Canario",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/KANARISCHER-PODENCO-329.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/podenco-canario",
    },
  ],
};

export default breed;
