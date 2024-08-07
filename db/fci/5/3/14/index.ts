import type { Breed, FCI } from "../../../../../types/breed";
import { getBreedImagePath } from "../../../../../src/utils";

const fci: FCI = {
  group: 5,
  section: 3,
  standardNumber: 14,
};

const breed: Breed = {
  names: [
    "Västgötaspets",
    "Westgotenspitz",
    "Schwedischer Schäferspitz",
    "Swedish Cattle Dog",
    "Schwedischer Vallhund",
  ],
  fci,
  image: getBreedImagePath({ ...fci }),
  podcast: [
    {
      episode: "Kriegsschrecken, Kommunikationsmöhren & falsche Schildkröten",
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/83-kriegsschrecken-kommunikationsmoehren-falsche-schildkroeten-t7s7tgilkx2ql",
      timecode: 3562,
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/V%C3%A4stg%C3%B6taspets",
    },
  ],
};

export default breed;
