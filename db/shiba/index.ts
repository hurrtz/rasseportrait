import type { Breed } from "../../types/breed";

const breed: Breed = {
  id: "shiba",
  names: ["Shiba", "Shiba Inu"],
  wasGuessedCorrectlyInPodcast: true,
  fci: {
    group: 2,
    section: 2,
    standardNumber: 257,
  },
  podcast: [
    {
      number: "Exklusiv #4",
      episode: "Live-Podcast Würselen: Wildkatzen",
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/live-podcast-wuerselen-wildkatzen-fp3kwv8cghuui",
      timecode: 5840,
      airDate: "2024-10-09",
    },
    {
      number: "Exklusiv #4",
      episode: "Live-Podcast Würselen: Wildkatzen",
      url: "https://plus.rtl.de/video-tv/shows/tierisch-menschlich-der-video-podcast-1001612/staffel-2-1007832/episode-4-live-podcast-wuerselen-wildkatzen-1013241",
      timecode: 5840,
      type: "video",
      airDate: "2024-10-09",
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Shiba",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/SHIBA-257.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/shiba",
    },
  ],
};

export default breed;
