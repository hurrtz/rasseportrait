import type { KnowledgeTopic } from "../../../types/knowledge";

export default {
  id: "silvester",
  title: {
    internal: "silvester",
    public: "Silvester",
  },
  summary: "Wie man Hunden durch Lärm, Feuerwerk und Angst hilft.",
  status: "draft",
  content: `
Silvester ist für viele Hunde eine besonders stressige Zeit. Der Lärm von Feuerwerk und Böllern
kann bei Hunden Angst und Panik auslösen. Es gibt verschiedene Strategien und Maßnahmen, mit denen
man seinem Hund helfen kann, diese Zeit besser zu überstehen. Dazu gehören Vorbereitung,
Desensibilisierung, die richtige Umgebung und im Bedarfsfall auch tierärztliche Unterstützung.
  `.trim(),
  podcast: [],
  furtherReading: [],
} satisfies KnowledgeTopic;
