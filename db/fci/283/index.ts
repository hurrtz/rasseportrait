import type { Breed, FCI } from "../../../types/breed";

const fci: FCI = {
  group: 9,
  section: 1,
  standardNumber: 283,
};

const { standardNumber: id } = fci;

const breed: Breed = {
  id,
  names: ["Coton de Tuléar", "Baumwollhund"],
  fci,
  podcast: [
    {
      number: 126,
      episode: "Podcast live: Entenschnabelmaulkorb",
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/126-podcast-live-entenschnabelmaulkorb-b61210fz1bl75",
      timecode: 4408,
      airDateTimestamp: 1691629200000,
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Coton_de_Tul%C3%A9ar",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/COTON-DE-TULEAR-283.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/coton-de-tulear",
    },
  ],
};

export default breed;
