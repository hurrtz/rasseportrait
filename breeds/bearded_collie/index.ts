import type { Breed } from "../../types/breed";

const breed: Breed = {
  id: "bearded_collie",
  names: [
    "Bearded Collie",
    "Mongrel",
    "Mouled Dog",
    "beardie",
    "Mountain Collie",
    "Hairy Mou'ed Collie",
    "Highland Collie",
    "Mountain Collie",
  ],
  wasGuessedCorrectlyInPodcast: true,
  fci: {
    group: 1,
    section: 1,
    standardNumber: 271,
  },
  podcast: [
    {
      number: 195,
      episode: "Frau mit Rollkoffer",
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/171-abschied-in-die-sommerpause-sst637kxiu8ty",
      timecode: 2557,
      airDate: "2024-12-05",
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Bearded_Collie",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/BEARDED-COLLIE-271.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/bearded-collie",
    },
    {
      name: "Martin Rütter",
      url: "https://www.martinruetter.com/rassekunde/bearded-collie",
    },
  ],
};

export default breed;
