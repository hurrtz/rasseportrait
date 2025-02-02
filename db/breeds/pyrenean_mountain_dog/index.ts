import type { Breed } from "../../../types/breed";

const breed: Breed = {
  id: "pyrenean_mountain_dog",
  names: ["Chien de Montagne des Pyrénées", "Pyrenäenberghund", "Patou"],
  wasGuessedCorrectlyInPodcast: true,
  fci: {
    group: 2,
    section: 2,
    standardNumber: 137,
  },
  podcast: [
    {
      number: 63,
      episode: "Hundepension, Katzenfänger & Let's Dance",
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/63-hundepension-katzenfaenger-lets-dance-dl5as9b3mwwhh",
      timecode: 2786,
      airDate: "2022-05-26",
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Chien_de_Montagne_des_Pyr%C3%A9n%C3%A9es",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/PYRENAEN-BERGHUND-137.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/pyrenaeen-berghund",
    },
    {
      name: "Martin Rütter",
      url: "https://www.martinruetter.com/ratgeber/rassekunde/pyrenaeenberghund",
    },
  ],
};

export default breed;
