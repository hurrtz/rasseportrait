import type { Breed } from "../../../types/breed";

const breed: Breed = {
  id: "bolognese_dog",
  names: ["Bologneser"],
  wasGuessedCorrectlyInPodcast: true,
  fci: {
    group: 9,
    section: 1,
    standardNumber: 196,
  },
  podcast: [
    {
      number: 161,
      episode: "Der Hundeprofi unterwegs & Eifersucht in der Podcast-Ehe",
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/161-der-hundeprofi-unterwegs-eifersucht-in-der-podcast-ehe-jmf8cndv5kf19",
      timecode: 3830,
      airDate: "2024-04-11",
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Bologneser",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/BOLOGNESER-196.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/bologneser",
    },
  ],
};

export default breed;
