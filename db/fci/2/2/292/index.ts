import type { Breed, FCI } from "../../../../../types/breed";
import { getBreedImagePath } from "../../../../../src/utils";

const fci: FCI = {
  group: 2,
  section: 2,
  standardNumber: 292,
};

const breed: Breed = {
  names: ["Dogo Argentino"],
  fci,
  image: getBreedImagePath({ ...fci }),
  podcast: [
    {
      episode:
        "Giftige Nüsse, Chihuahua im Rettungsdienst & Rütter als Lakritzfigur",
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/64-giftige-nuesse-chihuahua-im-rettungsdienst-ruetter-als-lakritzfigur-1al7eu52bnser",
      timecode: 2551,
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Dogo_Argentino",
    },
  ],
};

export default breed;
