import type { Breed, FCI } from "../../../../../types/breed";
import { getBreedImagePath } from "../../../../../src/utils";

const fci: FCI = {
  group: 8,
  section: 1,
  standardNumber: 121,
};

const { standardNumber: id } = fci;

const breed: Breed = {
  id,
  names: [
    "Flat Coated Retriever",
    "Retriever à poil plat",
    "Cobrador de pelo liso",
  ],
  fci,
  image: getBreedImagePath({ ...fci }),
  podcast: [
    {
      number: 68,
      episode: "Einhoder, König der Kindsköpfe & verkohlte Hundepfoten",
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/68-einhoder-koenig-der-kindskoepfe-verkohlte-hundepfoten-xyr6ciyqxhzcf",
      timecode: 2296,
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Flat_Coated_Retriever",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/FLAT-COATED-RETRIEVER-121.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/flat-coated-retriever",
    },
  ],
};

export default breed;
