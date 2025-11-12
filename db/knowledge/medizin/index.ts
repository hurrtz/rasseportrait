import type { KnowledgeTopic } from "../../../types/knowledge";

export default {
  id: "medizin",
  title: {
    internal: "medizin",
    public: "Medizin",
  },
  description:
    "Medizinisches Wissen rund um den Hund - Gesundheit, Krankheiten und Vorsorge.",
  content: `
# Medizin

Die Hundemedizin umfasst alle Aspekte der Gesundheitsvorsorge und -versorgung von Hunden. 
Dazu gehören Themen wie Impfungen, Parasitenbekämpfung, häufige Erkrankungen, 
Erste Hilfe und präventive Maßnahmen. Regelmäßige tierärztliche Kontrollen und 
ein fundiertes Grundwissen über die Gesundheit des Hundes sind wichtige Aspekte 
verantwortungsvoller Hundehaltung.

Hier werden in Zukunft detaillierte Informationen zu diesem wichtigen Thema zusammengetragen.
  `.trim(),
  podcast: [],
  furtherReading: [],
} satisfies KnowledgeTopic;
