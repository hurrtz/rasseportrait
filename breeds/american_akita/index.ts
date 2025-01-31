import type { Breed } from "../../types/breed";

const breed: Breed = {
  id: "american_akita",
  names: [
    "Amerikanischer Akita",
    "Great Japanese Dog",
    "Großer Japanischer Hund",
  ],
  wasGuessedCorrectlyInPodcast: true,
  fci: {
    group: 5,
    section: 5,
    standardNumber: 344,
  },
  podcast: [
    {
      number: "Summer Edition #7",
      episode: "Hobby Horsing for Olympia!",
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/summer-edition-7-hobby-horsing-for-olympia-7pbpazh2zvi72",
      timecode: 1075,
      airDate: "2024-08-08",
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Amerikanischer_Akita",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/AMERIKANISCHER-AKITA-344.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/amerikanischer-akita",
    },
  ],
};

export default breed;
