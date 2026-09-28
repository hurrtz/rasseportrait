import type { EditorialOverlay } from "../../../types/hundewissen";

export default {
  id: "tierversuche",
  title: {
    internal: "tierversuche",
    public: "Tierversuche",
  },
  status: "draft",
  content: `
Tierversuche sind Experimente an und mit lebenden Tieren. Bei Hunden werden solche Versuche in
verschiedenen Bereichen durchgeführt, etwa in der medizinischen Forschung oder bei der Entwicklung
von Medikamenten. Das Thema ist ethisch hochsensibel und bedarf einer differenzierten Betrachtung.
  `.trim(),
} satisfies EditorialOverlay;
