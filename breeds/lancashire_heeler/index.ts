import type { Breed } from "../../types/breed";

const breed: Breed = {
  id: "lancashire_heeler",
  names: ["Lancashire Heeler", "Ormskirk Heeler"],
  wasGuessedCorrectlyInPodcast: false,
  fci: {
    group: 1,
    section: 1,
    standardNumber: 360,
  },
  podcast: [
    {
      number: "Exklusiv #3",
      episode: "Live-Podcast Köln: Die große Überraschung",
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/live-podcast-koeln-die-grosse-ueberraschung-fd8vbp81ih11w",
      timecode: 1586,
      airDate: "2024-09-12",
    },
    {
      number: "Exklusiv #3",
      episode: "Live-Podcast Köln: Die große Überraschung",
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/live-podcast-koeln-die-grosse-ueberraschung-fd8vbp81ih11w",
      timecode: 1586,
      type: "video",
      airDate: "2024-09-12",
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Lancashire_Heeler",
    },
    {
      name: "FCI",
      url: "https://fci.be/de/nomenclature/LANCASHIRE-HEELER-360.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/lancashire-heeler",
    },
  ],
};

export default breed;
