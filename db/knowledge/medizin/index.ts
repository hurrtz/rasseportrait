import type { EditorialOverlay } from "../../../types/hundewissen";

export default {
  id: "medizin",
  title: {
    internal: "medizin",
    public: "Medizin",
  },
  status: "draft",
  content: `
Die Hundemedizin umfasst alle Aspekte der Gesundheitsvorsorge und -versorgung von Hunden.
Dazu gehören Themen wie Impfungen, Parasitenbekämpfung, häufige Erkrankungen,
Erste Hilfe und präventive Maßnahmen. Regelmäßige tierärztliche Kontrollen und
ein fundiertes Grundwissen über die Gesundheit des Hundes sind wichtige Aspekte
verantwortungsvoller Hundehaltung.
  `.trim(),
} satisfies EditorialOverlay;
