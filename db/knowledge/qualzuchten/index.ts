import type { EditorialOverlay } from "../../../types/hundewissen";

export default {
  id: "qualzuchten",
  title: {
    internal: "qualzuchten",
    public: "Qualzuchten",
  },
  status: "draft",
  content: `
Qualzucht bezeichnet Zuchtformen bei Hunden, bei denen gesundheitliche Beeinträchtigungen,
Schmerzen oder Leiden für die Tiere in Kauf genommen werden, um bestimmte äußere Merkmale zu erreichen.

Dies kann zu erheblichen gesundheitlichen Problemen führen und das Wohlbefinden der Tiere stark beeinträchtigen.
  `.trim(),
} satisfies EditorialOverlay;
