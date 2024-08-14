import type { Breed, FCI } from "../../../types/breed";

const fci: FCI = {
  group: 1,
  section: 1,
  standardNumber: 293,
};

const { standardNumber: id } = fci;

const breed: Breed = {
  id,
  names: [
    "Australian Kelpie",
    "Kelpie",
    "Australischer Schäferhund",
    "Australian Sheepdog",
    "Barb",
  ],
  fci,
  podcast: [
    {
      number: 122,
      episode: "Kurioser Unfall, Katzenbegegnungen & Fledermausbomben",
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/122-kurioser-unfall-katzenbegegnungen-fledermausbomben-vdy2nybu1xoqm",
      timecode: 2632,
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Australian_Kelpie",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/AUSTRALIAN-KELPIE-293.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/australian-kelpie",
    },
  ],
};

export default breed;
