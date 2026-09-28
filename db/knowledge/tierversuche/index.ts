import type { KnowledgeTopic } from "../../../types/knowledge";

export default {
  id: "tierversuche",
  title: {
    internal: "tierversuche",
    public: "Tierversuche",
  },
  summary: "Experimente an Hunden in Forschung und Medikamentenentwicklung.",
  status: "draft",
  content: `
Tierversuche sind Experimente an und mit lebenden Tieren. Bei Hunden werden solche Versuche in
verschiedenen Bereichen durchgeführt, etwa in der medizinischen Forschung oder bei der Entwicklung
von Medikamenten. Das Thema ist ethisch hochsensibel und bedarf einer differenzierten Betrachtung.
  `.trim(),
  podcast: [],
  furtherReading: [],
} satisfies KnowledgeTopic;
