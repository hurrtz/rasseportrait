import type { Breed, FCI } from "../../../../../types/breed";
import { getBreedImagePath } from "../../../../../src/utils";

const fci: FCI = {
  group: 7,
  section: 1,
  standardNumber: 118,
};

const { standardNumber: id } = fci;

const breed: Breed = {
  id,
  names: ["Großer Münsterländer"],
  fci,
  image: getBreedImagePath({ ...fci }),
  podcast: [
    {
      number: 134,
      episode: "Mischwesen & Cancelculture",
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/134-mischwesen-cancelculture-v758khsqvx1l5",
      timecode: 4027,
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Gro%C3%9Fer_M%C3%BCnsterl%C3%A4nder",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/GROSSER-MUNSTERLANDER-VORSTEHHUND-118.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/grosser-muensterlaender-vorstehhund",
    },
  ],
};

export default breed;
