import type { Breed, FCI } from "../../../types/breed";
import { getBreedImagePath } from "../../../src/utils";

const fci: FCI = {
  group: 2,
  section: 2,
  standardNumber: 116,
};

const { standardNumber: id } = fci;

const breed: Breed = {
  id,
  names: ["Bordeauxdogge", "Dogue de Bordeaux"],
  fci,
  podcast: [
    {
      number: 114,
      episode: "Einfach machen",
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/114-einfach-machen-t8x681865vs1g",
      timecode: 3349,
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Dogue_de_Bordeaux",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/BORDEAUXDOGGE-116.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/bordeauxdogge",
    },
  ],
};

export default breed;
