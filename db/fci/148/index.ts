import type { Breed, FCI } from "../../../types/breed";
import { getBreedImagePath } from "../../../src/utils";

const fci: FCI = {
  group: 4,
  section: 1,
  standardNumber: 148,
};

const { standardNumber: id } = fci;

const breed: Breed = {
  id,
  names: ["Dackel", "Teckel", "Dachshund"],
  variants: [
    {
      names: ["Kurzhaar"],
      id: "short",
      furtherReading: [
        {
          name: "VDH",
          url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/teckel-kurzhaar",
        },
      ],
    },
    {
      names: ["Langhaar"],
      id: "long",
      furtherReading: [
        {
          name: "VDH",
          url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/teckel-langhaar",
        },
      ],
    },
    {
      names: ["Rauhaar"],
      id: "wire",
      furtherReading: [
        {
          name: "VDH",
          url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/teckel-rauhhaar",
        },
      ],
    },
  ],
  fci,
  podcast: [
    {
      number: 56,
      episode: "Martin wird aufgemischt, krumme Dackelbeine & Spartipps Teil 1",
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/56-martin-wird-aufgemischt-krumme-dackelbeine-spartipps-teil-1-6g11t4rkl512j",
      timecode: 1570,
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Dackel",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/DACHSHUND-148.html",
    },
  ],
};

export default breed;
