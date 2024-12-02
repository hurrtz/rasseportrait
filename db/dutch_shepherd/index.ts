import type { Breed } from "../../types/breed";

const breed: Breed = {
  id: "dutch_shepherd",
  names: ["Hollandse Herdershond", "Holländischer Schäferhund", "Herder"],
  wasGuessedCorrectlyInPodcast: true,
  variants: [
    {
      names: ["Kurzhaar"],
      id: "short",
      furtherReading: [
        {
          name: "Martin Rütter",
          url: "https://www.martinruetter.com/rassekunde/hollaendischer-schaeferhund-kurzhaar",
        },
      ],
    },
    {
      names: ["Langhaar"],
      id: "long",
    },
    {
      names: ["Rauhhaar"],
      id: "rough",
    },
  ],
  fci: {
    group: 1,
    section: 1,
    standardNumber: 223,
  },
  podcast: [
    {
      number: "Summer Edition #4",
      episode: "Körper kräftig, aber nicht ohne Adel!",
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/summer-edition-4-koerper-kraeftig-aber-nicht-ohne-adel-zjwmcmhv4vzuh",
      timecode: 1502,
      airDate: "2024-07-18",
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Hollandse_Herdershond",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/HOLLANDISCHER-SCHAFERHUND-223.html",
    },
    {
      name: "herdershond.ch",
      url: "https://www.herdershond.ch/rasse/",
    },
  ],
};

export default breed;
