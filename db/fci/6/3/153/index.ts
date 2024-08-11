import type { Breed, FCI } from "../../../../../types/breed";
import { getBreedImagePath } from "../../../../../src/utils";

const fci: FCI = {
  group: 6,
  section: 3,
  standardNumber: 153,
};

const { standardNumber: id } = fci;

const breed: Breed = {
  id,
  names: ["Dalmatiner"],
  fci,
  image: getBreedImagePath({ ...fci }),
  podcast: [
    {
      number: 105,
      episode: "Geiselnahme, skurrile Wildtiere & 1,5 Grad wärmer",
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/105-geiselnahme-skurrile-wildtiere-1-5-grad-waermer-9qzro9uynb4pc",
      timecode: 3565,
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Dalmatiner",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/DALMATINER-153.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/dalmatiner",
    },
  ],
};

export default breed;
