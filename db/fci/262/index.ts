import type { Breed, FCI } from "../../../types/breed";
import { getBreedImagePath } from "../../../src/utils";

const fci: FCI = {
  group: 5,
  section: 5,
  standardNumber: 262,
};

const { standardNumber: id } = fci;

const breed: Breed = {
  id,
  names: ["Japan-Spitz", "日本スピッツ", "Nihon Supittsu", "Japanischer Spitz"],
  fci,
  image: getBreedImagePath({ ...fci }),
  podcast: [
    {
      number: 168,
      episode: "R.I.P. Kuno",
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/168-rip-kuno-wq8x5w4z45ctt",
      timecode: 2072,
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Japan-Spitz",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/JAPAN-SPITZ-262.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/japan-spitz",
    },
  ],
};

export default breed;
