import type { Breed, FCI } from "../../../../../types/breed";
import { getBreedImagePath } from "../../../../../src/utils";

const fci: FCI = {
  group: 8,
  section: 3,
  standardNumber: 336,
};

const { standardNumber: id } = fci;

const breed: Breed = {
  id,
  names: [
    "Spanischer Wasserhund",
    "Perro de Agua Español",
    "perro Turco",
    "Türkenhund",
    "Turco Andaluz",
    "Andalusischer Türke",
  ],
  fci,
  image: getBreedImagePath({ ...fci }),
  podcast: [
    {
      episode: "Suppenattacke, Rudelbegegnung & 1 eiliger Aufruf!!",
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/85-suppenattacke-rudelbegegnung-1-eiliger-aufruf-zyhm5ofxax4e1",
      timecode: 4006,
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Perro_de_Agua_Espa%C3%B1ol",
    },
  ],
};

export default breed;
