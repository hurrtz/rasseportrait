import type { Breed, FCI } from "../../types/breed";
import { getBreedImagePath } from "../../src/utils";

const fci: FCI = {
  group: -1,
  section: -1,
  standardNumber: -1,
};

const breed: Breed = {
  id: "catalburun",
  names: [
    "Catalburun",
    "Tarsus Çatalburun",
    "Tarsus Çatalburun Kopegi",
    "Tarsus Çatalburun Av Kopegi",
    "Çatalburun",
    "Turkish Pointer",
    "Turk Pointer",
    "Tarsus Pointer",
    "Tarsus-Mersin Pointer",
    "Turkish Fork-Nosed Pointer",
    "Turkish Split-Nosed Pointer",
    "Turkish Çatalburun Pointer",
    "Çatalburun Pointer",
    "Pointer de Turquía",
  ],
  image: getBreedImagePath({ ...fci, breedName: "catalburun" }),
  fci,
  podcast: [
    {
      number: 152,
      episode: "Leuchtspray für alle!",
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/152-leuchtspray-fuer-alle-nd21vdwsoa26d",
      timecode: 2798,
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Catalburun",
    },
  ],
};

export default breed;