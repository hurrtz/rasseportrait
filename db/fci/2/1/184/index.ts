import type { Breed, FCI } from "../../../../../types/breed";
import { getBreedImagePath } from "../../../../../src/utils";

const fci: FCI = {
  group: 2,
  section: 1,
  standardNumber: 184,
};

const { standardNumber: id } = fci;

const breed: Breed = {
  id,
  names: ["Deutscher Pinscher"],
  fci,
  image: getBreedImagePath({ ...fci }),
  podcast: [
    {
      episode: "Bitte nicht nachmachen!",
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/89-bitte-nicht-nachmachen-tt85sxkz7dhtd",
      timecode: 1470,
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Deutscher_Pinscher",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/DEUTSCHER-PINSCHER-184.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/deutscher-pinscher",
    },
  ],
};

export default breed;
