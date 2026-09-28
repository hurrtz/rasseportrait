import type { KnowledgeTopic } from "../../../types/knowledge";

export default {
  id: "schutzhunde",
  title: {
    internal: "schutzhunde",
    public: "Schutzhunde",
  },
  summary: "Ausbildung, Verantwortung und die Anforderungen im Hundesport.",
  status: "draft",
  content: `
Schutzhunde sind speziell ausgebildete Hunde, die zum Schutz von Personen oder Eigentum eingesetzt werden.
Die Ausbildung ist anspruchsvoll und erfordert sowohl vom Hund als auch vom Halter besondere Fähigkeiten
und Verantwortungsbewusstsein. Schutzhundearbeit ist eine Hundesportart, die höchste Anforderungen an
Gehorsam, Nervenstärke und Triebveranlagung stellt.
  `.trim(),
  podcast: [],
  furtherReading: [],
} satisfies KnowledgeTopic;
