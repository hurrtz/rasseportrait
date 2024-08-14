import type { Breed, FCI } from "../../../types/breed";
import { getBreedImagePath } from "../../../src/utils";

const fci: FCI = {
  group: 5,
  section: 5,
  standardNumber: 255,
};

const { standardNumber: id } = fci;

const breed: Breed = {
  id,
  names: ["Akita", "Akita-Inu", "Japanischer Akita", "Akita Ken", "秋田犬"],
  fci,
  podcast: [
    {
      number: "Summer Edition #7",
      episode: "Hobby Horsing for Olympia!",
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/neue-folge",
      timecode: 1075,
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Akita_(Hunderasse)",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/AKITA-255.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/akita",
    },
  ],
};

export default breed;
