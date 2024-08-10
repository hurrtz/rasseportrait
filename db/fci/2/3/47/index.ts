import type { Breed, FCI } from "../../../../../types/breed";
import { getBreedImagePath } from "../../../../../src/utils";

const fci: FCI = {
  group: 2,
  section: 3,
  standardNumber: 47,
};

const { standardNumber: id } = fci;

const breed: Breed = {
  id,
  names: ["Entlebucher Sennenhund"],
  fci,
  image: getBreedImagePath({ ...fci }),
  podcast: [
    {
      episode: "Braunes Rauschen & veganes Futter",
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/147-braunes-rauschen-veganes-futter-rq1a38523a8db",
      timecode: 2865,
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Entlebucher_Sennenhund",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/ENTLEBUCHER-SENNENHUND-47.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/entlebucher-sennenhund",
    },
  ],
};

export default breed;
