import type { Breed, FCI } from "../../../types/breed";

const fci: FCI = {
  group: 8,
  section: 1,
  standardNumber: 312,
};

const { standardNumber: id } = fci;

const breed: Breed = {
  id,
  names: ["Nova Scotia Duck Tolling Retriever"],
  fci,
  podcast: [
    {
      number: 136,
      episode: "Positive Verstärkung, Männergrippe & Zurückrudern",
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/136-positive-verstaerkung-maennergrippe-zurueckrudern-pcewcbc9hru3t",
      timecode: 1380,
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Nova_Scotia_Duck_Tolling_Retriever",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/NOVA-SCOTIA-RETRIEVER-312.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/nova-scotia-duck-tolling-retriever",
    },
  ],
};

export default breed;
