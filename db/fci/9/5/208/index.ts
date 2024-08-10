import type { Breed, FCI } from "../../../../../types/breed";
import { getBreedImagePath } from "../../../../../src/utils";

const fci: FCI = {
  group: 9,
  section: 5,
  standardNumber: 208,
};

const { standardNumber: id } = fci;

const breed: Breed = {
  id,
  names: ["Shih Tzu", "獅子狗 / 狮子狗", "Shīzigǒu", "Löwenhund"],
  fci,
  image: getBreedImagePath({ ...fci }),
  podcast: [
    {
      episode: "Summer Edition #2: Sommernostalgie und Bahnärger",
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/summer-edition-2-sommernostalgie-und-bahnaerger-0fne38y8v7soe",
      timecode: 1416,
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Shih_Tzu",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/SHIH-TZU-208.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/shih-tzu",
    },
  ],
};

export default breed;
