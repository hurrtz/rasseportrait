import type { Breed } from "../../types/breed";

const breed: Breed = {
  id: "chinese_crested_dog",
  names: ["Chinesischer Schopfhund"],
  variants: [
    {
      names: ["Haarlos"],
      id: "hairless",
      furtherReading: [
        {
          name: "VDH",
          url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/chinese-crested-dog-hairless",
        },
      ],
    },
    {
      names: ["Powderpuff"],
      id: "powderpuff",
      furtherReading: [
        {
          name: "VDH",
          url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/chinese-crested-dog-powderpuff",
        },
      ],
    },
  ],
  fci: {
    group: 9,
    section: 4,
    standardNumber: 288,
  },
  podcast: [
    {
      number: 123,
      episode: "Oh, wie schön ist Panama",
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/123-oh-wie-schoen-ist-panama-92aq873dx2z0n",
      timecode: 1907,
      airDateTimestamp: 1689814800000,
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Chinesischer_Schopfhund",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/CHINESISCHER-SCHOPFHUND-288.html",
    },
  ],
};

export default breed;
