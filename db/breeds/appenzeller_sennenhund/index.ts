import type { Breed } from "../../../types/breed";

const breed: Breed = {
  id: "appenzeller_sennenhund",
  names: ["Appenzeller Sennenhund", "Appenzellerhund", "Appezeller Bläss"],
  wasGuessedCorrectlyInPodcast: true,
  fci: {
    group: 2,
    section: 3,
    standardNumber: 46,
  },
  podcast: [
    {
      number: "Exklusiv #5",
      episode: "Live-Podcast Unna",
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/live-podcast-unna-6u1dfm6uo2jq0",
      timecode: 5647,
      airDate: "2024-10-23",
    },
    {
      number: "Exklusiv #5",
      episode: "Live-Podcast Unna",
      url: "https://plus.rtl.de/video-tv/shows/tierisch-menschlich-der-video-podcast-1001612/staffel-2-1007832/episode-5-live-podcast-unna-1013242",
      timecode: 5647,
      type: "video",
      airDate: "2024-10-23",
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Appenzeller_Sennenhund",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/APPENZELLER-SENNENHUND-46.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/appenzeller-sennenhund",
    },
    {
      name: "Martin Rütter",
      url: "https://www.martinruetter.com/rassekunde/appenzeller-sennenhund",
    },
  ],
};

export default breed;
