import type { Breed, FCI } from "../../../../../types/breed";
import { getBreedImagePath } from "../../../../../src/utils";

const fci: FCI = {
  group: 5,
  section: 7,
  standardNumber: 94,
};

const { standardNumber: id } = fci;

const breed: Breed = {
  id,
  names: ["Podengo Português", "Portugiesischer Podengo", "Warren Hound"],
  fci,
  image: getBreedImagePath({ ...fci }),
  podcast: [
    {
      episode: "Glow down, Hund & Baby, Lösseler Waldgeist",
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/59-glow-down-hund-baby-loesseler-waldgeist-qthfcbunlahuh",
      timecode: 3885,
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Podengo_Portugu%C3%AAs",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/PORTUGIESISCHER-PODENGO-94.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/podengo-portugues",
    },
  ],
};

export default breed;
