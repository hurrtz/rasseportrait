import type { Breed, FCI } from "../../../types/breed";

const fci: FCI = {
  group: 9,
  section: 3,
  standardNumber: 82,
};

const { standardNumber: id } = fci;

const breed: Breed = {
  id,
  names: ["Petit Brabançon", "Kleiner Brabanter", "Brabanter Griffon"],
  fci,
  podcast: [
    {
      number: 156,
      episode: "Garnelenfieber",
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/156-garnelenfieber-xhvk5s6b64dc4",
      timecode: 1860,
      airDateTimestamp: 1709773200000,
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Petit_Braban%C3%A7on",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/BRABANTER-GRIFFON-82.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/petit-brabancon",
    },
  ],
};

export default breed;