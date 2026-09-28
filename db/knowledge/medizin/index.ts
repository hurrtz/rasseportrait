import type { KnowledgeTopic } from "../../../types/knowledge";

export default {
  id: "medizin",
  title: {
    internal: "medizin",
    public: "Medizin",
  },
  summary: "Impfungen, Parasiten, häufige Erkrankungen und Erste Hilfe.",
  status: "draft",
  content: `
Die Hundemedizin umfasst alle Aspekte der Gesundheitsvorsorge und -versorgung von Hunden.
Dazu gehören Themen wie Impfungen, Parasitenbekämpfung, häufige Erkrankungen,
Erste Hilfe und präventive Maßnahmen. Regelmäßige tierärztliche Kontrollen und
ein fundiertes Grundwissen über die Gesundheit des Hundes sind wichtige Aspekte
verantwortungsvoller Hundehaltung.
  `.trim(),
  podcast: [],
  furtherReading: [],
} satisfies KnowledgeTopic;
