import type { KnowledgeTopic } from "../../../types/knowledge";

export default {
  id: "hundesprache",
  title: {
    internal: "hundesprache",
    public: "Hundesprache",
  },
  summary: "Wie Hunde mit Körper, Mimik, Lauten und Gerüchen kommunizieren.",
  status: "draft",
  content: `
Die Hundesprache umfasst alle Ausdrucksformen, mit denen Hunde kommunizieren. Dazu gehören
Körpersprache (Ohren, Rute, Körperhaltung), Mimik, Laute (Bellen, Knurren, Winseln) und
Gerüche. Das Verstehen der Hundesprache ist essentiell für eine gute Mensch-Hund-Beziehung
und hilft, Missverständnisse und Konflikte zu vermeiden.
  `.trim(),
  podcast: [],
  furtherReading: [],
} satisfies KnowledgeTopic;
