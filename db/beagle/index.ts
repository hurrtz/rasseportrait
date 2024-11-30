import type { Breed } from "../../types/breed";

const breed: Breed = {
  id: "beagle",
  names: ["Beagle"],
  wasGuessedCorrectlyInPodcast: "not_applicable",
  fci: {
    group: 6,
    section: 1,
    standardNumber: 161,
  },
  podcast: [
    {
      number: 45,
      episode: "ASMR, Beagle und Wombatkacke",
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/45-asmr-beagle-und-wombatkacke-iesctegwj6jg6",
      timecode: 1009,
      airDate: "2022-01-20",
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Beagle_(Hunderasse)",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/BEAGLE-161.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/beagle",
    },
  ],
};

export default breed;
