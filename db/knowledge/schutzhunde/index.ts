import type { EditorialOverlay } from "../../../types/hundewissen";

export default {
  id: "schutzhunde",
  title: {
    internal: "schutzhunde",
    public: "Schutzhunde",
  },
  status: "draft",
  content: `
Schutzhunde sind speziell ausgebildete Hunde, die zum Schutz von Personen oder Eigentum eingesetzt werden.
Die Ausbildung ist anspruchsvoll und erfordert sowohl vom Hund als auch vom Halter besondere Fähigkeiten
und Verantwortungsbewusstsein. Schutzhundearbeit ist eine Hundesportart, die höchste Anforderungen an
Gehorsam, Nervenstärke und Triebveranlagung stellt.
  `.trim(),
} satisfies EditorialOverlay;
