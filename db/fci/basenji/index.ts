import type { Breed } from "../../../types/breed";

const breed: Breed = {
  id: "basenji",
  names: ["Basenji", "Kongo-Terrier"],
  fci: {
    group: 5,
    section: 6,
    standardNumber: 43,
  },
  podcast: [
    {
      number: 59,
      episode: "Religionskriege bei Facebook, vegane Hunde und kleine Ritter",
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/58-religionskriege-bei-facebook-vegane-hunde-und-kleine-ritter-u6g77nktkpqi2",
      timecode: 1157,
      airDateTimestamp: 1650502800000,
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Basenji",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/BASENJI-43.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/basenji",
    },
  ],
};

export default breed;
