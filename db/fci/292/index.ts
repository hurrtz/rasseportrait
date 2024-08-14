import type { Breed, FCI } from "../../../types/breed";
import { getBreedImagePath } from "../../../src/utils";

const fci: FCI = {
  group: 2,
  section: 2,
  standardNumber: 292,
};

const { standardNumber: id } = fci;

const breed: Breed = {
  id,
  names: ["Dogo Argentino"],
  fci,
  podcast: [
    {
      number: 64,
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
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/ARGENTINISCHE-DOGGE-292.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/dogo-argentino",
    },
  ],
};

export default breed;
