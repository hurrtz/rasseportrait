import type { Breed, FCI } from "../../../../../types/breed";
import { getBreedImagePath } from "../../../../../src/utils";

const fci: FCI = {
  group: 2,
  section: 2,
  standardNumber: 315,
};

const { standardNumber: id } = fci;

const breed: Breed = {
  id,
  names: ["Broholmer"],
  fci,
  image: getBreedImagePath({ ...fci }),
  podcast: [
    {
      episode: "Schönheit, Wahn & arme Schweine",
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/82-schoenheit-wahn-arme-schweine-a9icwiyr0ey7v",
      timecode: 2869,
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Broholmer",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/BROHOLMER-315.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/broholmer",
    },
  ],
};

export default breed;
