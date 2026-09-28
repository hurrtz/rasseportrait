import type { EditorialOverlay } from "../../../types/hundewissen";

export default {
  id: "jagdhunde",
  title: {
    internal: "jagdhunde",
    public: "Jagdhunde",
  },
  status: "draft",
  content: `
Jagdhunde sind Hunde, die speziell für die Unterstützung bei der Jagd gezüchtet wurden.
Sie verfügen über besondere Fähigkeiten wie ausgeprägten Geruchssinn, Apportierfreude oder
Spurarbeit. Die Haltung von Jagdhunden erfordert spezielle Kenntnisse und eine artgerechte
Beschäftigung, die ihren natürlichen Anlagen entspricht.
  `.trim(),
} satisfies EditorialOverlay;
