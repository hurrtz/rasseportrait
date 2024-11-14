import type { Breed } from "../../types/breed";

const breed: Breed = {
  id: "german_wirehaired_pointer",
  names: ["Deutsch Drahthaar"],
  fci: {
    group: 7,
    section: 1,
    standardNumber: 98,
  },
  wasGuessedCorrectlyInPodcast: true,
  podcast: [
    {
      number: "Exklusiv #5",
      episode: "Live-Podcast Euskirchen",
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/live-podcast-euskirchen-xnzts3crxhjd5",
      timecode: 2438,
      airDate: "2024-11-13",
    },
    {
      number: "Exklusiv #5",
      episode: "Live-Podcast Euskirchen",
      url: "https://plus.rtl.de/video-tv/shows/tierisch-menschlich-der-video-podcast-1001612/staffel-2-1007832/episode-6-live-podcast-euskirchen-1013243",
      timecode: 2438,
      type: "video",
      airDate: "2024-11-13",
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Deutsch_Drahthaar",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/DEUTSCH-DRAHTHAAR-98.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/deutsch-drahthaar",
    },
  ],
};

export default breed;
