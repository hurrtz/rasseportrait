import type { EditorialOverlay } from "../../../types/hundewissen";

export default {
  id: "hundesprache",
  title: {
    internal: "hundesprache",
    public: "Hundesprache",
  },
  status: "draft",
  content: `
Die Hundesprache umfasst alle Ausdrucksformen, mit denen Hunde kommunizieren. Dazu gehören
Körpersprache (Ohren, Rute, Körperhaltung), Mimik, Laute (Bellen, Knurren, Winseln) und
Gerüche. Das Verstehen der Hundesprache ist essentiell für eine gute Mensch-Hund-Beziehung
und hilft, Missverständnisse und Konflikte zu vermeiden.
  `.trim(),
} satisfies EditorialOverlay;
