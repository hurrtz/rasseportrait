import type { Breed, FCI } from "../../../../../types/breed";
import { getBreedImagePath } from "../../../../../src/utils";

const fci: FCI = {
  group: 6,
  section: 3,
  standardNumber: 146,
};

const { standardNumber: id } = fci;

const breed: Breed = {
  id,
  names: ["Rhodesian Ridgeback"],
  image: getBreedImagePath({ ...fci }),
  fci,
  podcast: [
    {
      episode:
        "Geteiltes Sorgerecht für Tiere, falsches Mäusegulasch & Zwangspause für Polizeihunde",
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/44-geteiltes-sorgerecht-fuer-tiere-falsches-maeusegulasch-zwangspause-fuer-polizeihunde-ioj5kmbkn4v7c",
      timecode: 3197,
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Rhodesian_Ridgeback",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/RHODESIAN-RIDGEBACK-146.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/rhodesian-ridgeback",
    },
  ],
};

export default breed;
