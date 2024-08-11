import type { Breed, FCI } from "../../../../../types/breed";
import { getBreedImagePath } from "../../../../../src/utils";

const fci: FCI = {
  group: 10,
  section: 3,
  standardNumber: 285,
};

const { standardNumber: id } = fci;

const breed: Breed = {
  id,
  names: ["Galgo Español", "Galgo", "Spanischer Windhund"],
  fci,
  image: getBreedImagePath({ ...fci }),
  podcast: [
    {
      number: 47,
      episode:
        "Das traurige Schicksal der Galgos, Conny Reimann & Mythos Wildfutter",
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/47-das-traurige-schicksal-der-galgos-conny-reimann-mythos-wildfutter-qqta8btva9n8i",
      timecode: 1115,
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Galgo_Espa%C3%B1ol",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/SPANISCHER-WINDHUND-285.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/galgo-espanol",
    },
  ],
};

export default breed;
