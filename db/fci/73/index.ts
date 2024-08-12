import type { Breed, FCI } from "../../../types/breed";
import { getBreedImagePath } from "../../../src/utils";

const fci: FCI = {
  group: 3,
  section: 2,
  standardNumber: 73,
};

const { standardNumber: id } = fci;

const breed: Breed = {
  id,
  names: ["Scottish Terrier"],
  fci,
  image: getBreedImagePath({ ...fci }),
  podcast: [
    {
      number: 88,
      episode: "Ich bremse auch für Kinder",
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/88-ich-bremse-auch-fuer-kinder-z4tmc9itz9sz3",
      timecode: 1817,
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Scottish_Terrier",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/SCHOTTISCHER-TERRIER-73.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/scottish-terrier",
    },
  ],
};

export default breed;
