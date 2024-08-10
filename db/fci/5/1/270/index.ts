import type { Breed, FCI } from "../../../../../types/breed";
import { getBreedImagePath } from "../../../../../src/utils";

const fci: FCI = {
  group: 5,
  section: 1,
  standardNumber: 270,
};

const { standardNumber: id } = fci;

const breed: Breed = {
  id,
  names: ["Syberian Husky", "Siberischer Husky"],
  fci,
  image: getBreedImagePath({ ...fci }),
  podcast: [
    {
      episode:
        "Martin wird Katzenprofi, Hitzetipps kompakt & gläserne Hundekoffer",
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/70-martin-wird-katzenprofi-hitzetipps-kompakt-glaeserne-hundekoffer-ot6914r1cd1bo",
      timecode: 1324,
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Siberian_Husky",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/SIBERIAN-HUSKY-270.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/siberian-husky",
    },
  ],
};

export default breed;
