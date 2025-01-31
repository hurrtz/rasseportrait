import type { Breed } from "../../types/breed";

const breed: Breed = {
  id: "german_boxer",
  names: ["Deutscher Boxer", "Boxer"],
  wasGuessedCorrectlyInPodcast: false,
  fci: {
    group: 2,
    section: 2,
    standardNumber: 144,
  },
  podcast: [
    {
      number: 80,
      episode: "Ticketbetrug, Fakeprofile & Schadstoffe im Hundespielzeug",
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/80-ticketbetrug-fakeprofile-schadstoffe-im-hundespielzeug-3s90k5fnxokpg",
      timecode: 2742,
      airDate: "2022-09-22",
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Deutscher_Boxer",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/DEUTSCHER-BOXER-144.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/boxer",
    },
    {
      name: "Martin Rütter",
      url: "https://www.martinruetter.com/rassekunde/deutscher-boxer",
    },
  ],
};

export default breed;
