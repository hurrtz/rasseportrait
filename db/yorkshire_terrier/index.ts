import type { Breed } from "../../types/breed";

const breed: Breed = {
  id: "yorkshire_terrier",
  names: ["Yorkshire Terrier"],
  wasGuessedCorrectlyInPodcast: true,
  fci: {
    group: 3,
    section: 4,
    standardNumber: 86,
  },
  podcast: [
    {
      number: 84,
      episode: "Beef, vegane Wurst & Schutzhund-Training mit Nebenwirkungen",
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/84-beef-vegane-wurst-schutzhund-training-mit-nebenwirkungen-dtn7aqb2nwlal",
      timecode: 2314,
      airDate: "2022-10-20",
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Yorkshire_Terrier",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/YORKSHIRE-TERRIER-86.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/yorkshire-terrier",
    },
    {
      name: "Martin Rütter",
      url: "https://www.martinruetter.com/rassekunde/yorkshire-terrier",
    },
  ],
};

export default breed;
