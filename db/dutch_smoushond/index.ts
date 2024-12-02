import type { Breed } from "../../types/breed";

const breed: Breed = {
  id: "dutch_smoushond",
  names: ["Hollandse Smoushond", "Holländischer Rattler"],
  wasGuessedCorrectlyInPodcast: false,
  fci: {
    group: 2,
    section: 1,
    standardNumber: 308,
  },
  podcast: [
    {
      number: 190,
      episode: 'Hausfuchs! Ein Crosspodcast mit "Behind Science"',
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/190-hausfuchs-ein-crosspodcast-mit-behind-science-t635dvd6wdi21",
      timecode: 315,
      airDate: "2024-10-31",
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Hollandse_Smoushond",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/HOLLANDISCHER-SMOUSHUND-308.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/hollandse-smoushond",
    },
  ],
};

export default breed;
