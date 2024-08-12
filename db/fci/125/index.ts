import type { Breed, FCI } from "../../../types/breed";
import { getBreedImagePath } from "../../../src/utils";

const fci: FCI = {
  group: 8,
  section: 2,
  standardNumber: 125,
};

const { standardNumber: id } = fci;

const breed: Breed = {
  id,
  names: ["English Springer Spaniel"],
  fci,
  image: getBreedImagePath({ ...fci }),
  podcast: [
    {
      number: 109,
      episode: "Fliewatüüt, Fettfilter & Ferien",
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/109-fliewatueuet-fettfilter-ferien-u84xhk4aavxfa",
      timecode: 3328,
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/English_Springer_Spaniel",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/ENGLISH-SPRINGER-SPANIEL-125.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/english-springer-spaniel",
    },
  ],
};

export default breed;
