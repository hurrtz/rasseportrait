import { readFileSync } from "fs";
import { join } from "path";
import type { KnowledgeTopic } from "types/knowledge";

const { topics } = JSON.parse(
  readFileSync(join(__dirname, "../../public/data/knowledge.json"), "utf8"),
) as { topics: KnowledgeTopic[] };

const SUMMARIES: Record<string, string> = {
  hundesprache:
    "Wie Hunde mit Körper, Mimik, Lauten und Gerüchen kommunizieren.",
  jagdhunde:
    "Geruchssinn, Apportierfreude, Spurarbeit und was die Haltung verlangt.",
  medizin: "Impfungen, Parasiten, häufige Erkrankungen und Erste Hilfe.",
  qualzuchten:
    "Wenn äußere Merkmale wichtiger sind als die Gesundheit des Hundes.",
  schutzhunde: "Ausbildung, Verantwortung und die Anforderungen im Hundesport.",
  silvester: "Wie man Hunden durch Lärm, Feuerwerk und Angst hilft.",
  tierversuche:
    "Experimente an Hunden in Forschung und Medikamentenentwicklung.",
};

describe("compiled knowledge.json", () => {
  it("has the seven topics with their one-line summaries", () => {
    expect(
      Object.fromEntries(topics.map(({ id, summary }) => [id, summary])),
    ).toEqual(SUMMARIES);
  });

  it("marks every topic as a draft", () => {
    expect(topics.map(({ status }) => status)).toEqual(Array(7).fill("draft"));
  });

  it("no longer promises future content in the text", () => {
    topics.forEach(({ content }) => {
      expect(content).not.toContain("Hier werden in Zukunft");
    });
  });
});
