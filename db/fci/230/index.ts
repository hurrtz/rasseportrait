import type { Breed, FCI } from "../../../types/breed";

const fci: FCI = {
  group: 2,
  section: 2,
  standardNumber: 230,
};

const { standardNumber: id } = fci;

const breed: Breed = {
  id,
  names: ["Do Khyi", "Tibetanische Dogge", "Tibetdogge", "Tibetmastiff"],
  fci,
  podcast: [
    {
      number: 118,
      episode: "Getreidefreie Folge",
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/118-getreidefreie-folge-usumre6izvygu",
      timecode: 1499,
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Do_Khyi",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/DO-KHYI-230.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/do-khyi",
    },
  ],
};

export default breed;
