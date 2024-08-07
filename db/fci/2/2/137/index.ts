import type { Breed, FCI } from "../../../../../types/breed";
import { getBreedImagePath } from "../../../../../src/utils";

const fci: FCI = {
  group: 2,
  section: 2,
  standardNumber: 137,
};

const breed: Breed = {
  names: ["Chien de Montagne des Pyrénées", "Pyrenäenberghund", "Patou"],
  fci,
  image: getBreedImagePath({ ...fci }),
  podcast: [
    {
      episode: "Hundepension, Katzenfänger & Let´s Dance",
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/63-hundepension-katzenfaenger-lets-dance-dl5as9b3mwwhh",
      timecode: 2786,
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Deutscher_Sch%C3%A4ferhund",
    },
  ],
};

export default breed;
