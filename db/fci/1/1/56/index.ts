import type { Breed, FCI } from "../../../../../types/breed";
import { getBreedImagePath } from "../../../../../src/utils";

const fci: FCI = {
  group: 1,
  section: 1,
  standardNumber: 56,
};

const { standardNumber: id } = fci;

const breed: Breed = {
  id,
  names: ["Pumi"],
  fci,
  image: getBreedImagePath({ ...fci }),
  podcast: [
    {
      number: 128,
      episode: "Beamende Zecken, Kalsarikännit & Hundeduft",
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/128-beamende-zecken-kalsarikaennit-hundeduft-6vu1gxku02uiq",
      timecode: 1803,
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Pumi_(Hunderasse)",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/PUMI-56.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/pumi",
    },
  ],
};

export default breed;
