import type { Breed, FCI } from "../../../types/breed";
import { getBreedImagePath } from "../../../src/utils";

const fci: FCI = {
  group: 7,
  section: 1,
  standardNumber: 99,
};

const { standardNumber: id } = fci;

const breed: Breed = {
  id,
  names: ["Weimaraner"],
  variants: [
    {
      names: ["Kurzhaar"],
      id: "short",
      furtherReading: [
        {
          name: "VDH",
          url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/weimaraner-kurzhaar",
        },
      ],
    },
    {
      names: ["Langhaar"],
      id: "long",
      furtherReading: [
        {
          name: "VDH",
          url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/weimaraner-langhaar",
        },
      ],
    },
  ],
  fci,
  podcast: [
    {
      number: 52,
      episode: "Richtig Helfen, fliegende Kotbeutel & der Weimaraner",
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/52-richtig-helfen-fliegende-kotbeutel-der-weimaraner-m5dz64ld7wmvh",
      timecode: 2427,
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Weimaraner",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/WEIMARANER-99.html",
    },
  ],
};

export default breed;
