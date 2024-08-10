import type { Breed, FCI } from "../../../../../types/breed";
import { getBreedImagePath } from "../../../../../src/utils";

const fci: FCI = {
  group: 2,
  section: 2,
  standardNumber: 249,
};

const { standardNumber: id } = fci;

const breed: Breed = {
  id,
  names: [
    "Ca de Bou",
    "Perro dogo mallorquín",
    "Perro de Presa Mallorquín",
    "Mallorca-Dogge",
    "Mallorca Mastiff",
  ],
  fci,
  image: getBreedImagePath({ ...fci }),
  podcast: [
    {
      episode: "Ameisen-Waschstraße",
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/167-ameisen-waschstrasse-sctwq1mdogjpv",
      timecode: 0,
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Ca_de_Bou",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/MALLORCA-DOGGE-249.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/perro-dogo-mallorquin",
    },
  ],
};

export default breed;
