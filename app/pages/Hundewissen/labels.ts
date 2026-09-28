import type { EntryKind, ListenProvider } from "types/hundewissen";

/** 1 → "1 Folge", 4 → "4 Folgen" */
export const count = (n: number, one: string, many: string) =>
  `${n} ${n === 1 ? one : many}`;

export const episodes = (n: number) => count(n, "Folge", "Folgen");
export const entries = (n: number) => count(n, "Stelle", "Stellen");
export const topics = (n: number) => count(n, "Thema", "Themen");

export const KIND_LABELS: Record<EntryKind, string> = {
  discussion: "Diskussion",
  listener_question: "Hörerfrage",
  expert: "Expertenwissen",
  anecdote: "Anekdote",
  news: "Nachricht",
};

export const kindLabel = (kind: string) =>
  KIND_LABELS[kind as EntryKind] ?? "Diskussion";

const PROVIDERS: Record<ListenProvider, { name: string; where: string }> = {
  spotify: { name: "Spotify", where: "auf Spotify" },
  rtl: { name: "RTL+", where: "auf RTL+" },
  audio: { name: "Podcast-Feed", where: "im Podcast-Feed" },
};

/** "Spotify", "RTL+", "Podcast-Feed" */
export const providerName = (provider: ListenProvider) =>
  PROVIDERS[provider].name;

/** "Ab 30:28 auf Spotify anhören" */
export const listenLabel = (start: string, provider: ListenProvider) =>
  `Ab ${start} ${PROVIDERS[provider].where} anhören`;

export const CONTACT = "rasseportrait@tobiaswinkler.berlin";
