import type { Breed } from "../../types/breed";

const breed: Breed = {
  id: "alaskan_malamute",
  names: ["Alaskan Malamute", "Alaskischer Malamute"],
  wasGuessedCorrectlyInPodcast: true,
  fci: {
    group: 5,
    section: 1,
    standardNumber: 243,
  },
  podcast: [
    {
      number: 198,
      episode: "Naturstumper",
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/198-der-teuerste-floh-der-welt-drn0227qdnmu2",
      timecode: 1658,
      airDate: "2024-12-26",
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Alaskan_Malamute",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/ALASKAN-MALAMUTE-243.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/alaskan-malamute",
    },
    {
      name: "Martin Rütter",
      url: "https://www.martinruetter.com/rassekunde/alaskan-malamute",
    },
  ],
};

export default breed;
