import type { Breed, FCI } from "../../../types/breed";

const fci: FCI = {
  group: 1,
  section: 2,
  standardNumber: 39,
};

const { standardNumber: id } = fci;

const breed: Breed = {
  id,
  names: ["Welsh Corgi Pembroke"],
  fci,
  podcast: [
    {
      number: 50,
      episode: "Hundeparfüm, „Die Unvermittelbaren“ & der Corgi",
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/50-hundeparfuem-die-unvermittelbaren-der-corgi-fkny11pjvlp4x",
      timecode: 2925,
      airDateTimestamp: 1645664400000,
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Welsh_Corgi_Pembroke",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/WELSH-CORGI-PEMBROKE-39.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/welsh-corgi-pembroke",
    },
  ],
};

export default breed;