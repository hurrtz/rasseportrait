import type { KnowledgeTopic } from "../../../types/knowledge";

export default {
  id: "jagdhunde",
  title: {
    internal: "jagdhunde",
    public: "Jagdhunde",
  },
  summary:
    "Geruchssinn, Apportierfreude, Spurarbeit und was die Haltung verlangt.",
  status: "draft",
  content: `
Jagdhunde sind Hunde, die speziell für die Unterstützung bei der Jagd gezüchtet wurden.
Sie verfügen über besondere Fähigkeiten wie ausgeprägten Geruchssinn, Apportierfreude oder
Spurarbeit. Die Haltung von Jagdhunden erfordert spezielle Kenntnisse und eine artgerechte
Beschäftigung, die ihren natürlichen Anlagen entspricht.
  `.trim(),
  podcast: [],
  furtherReading: [],
} satisfies KnowledgeTopic;
