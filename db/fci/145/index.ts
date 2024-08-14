import type { Breed, FCI } from "../../../types/breed";
import { getBreedImagePath } from "../../../src/utils";

const fci: FCI = {
  group: 2,
  section: 2,
  standardNumber: 145,
};

const { standardNumber: id } = fci;

const breed: Breed = {
  id,
  names: ["Leonberger"],
  fci,
  podcast: [
    {
      number: 111,
      episode: '"Hundjes", Schreckreiz & Italopop',
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/111-hundjes-schreckreiz-italopop-ba9cvkn3rq8je",
      timecode: 2505,
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Leonberger",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/LEONBERGER-145.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/leonberger",
    },
  ],
};

export default breed;
