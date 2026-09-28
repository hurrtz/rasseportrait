import { meta as overviewMeta } from "../rasseportrait";
import { meta as knowledgeMeta } from "../hundewissen";
import { meta as statisticsMeta } from "../statistics";
import { meta as imprintMeta } from "../imprint";

const title = (tags: ReturnType<typeof overviewMeta>) =>
  tags.find((tag) => "title" in tag)?.title;

describe("page titles", () => {
  it("name each page followed by the product name", () => {
    const args = {} as never;

    expect(title(overviewMeta(args))).toBe(
      "Rasseportrait · Alle Hunderassen aus Tierisch Menschlich",
    );
    expect(title(knowledgeMeta(args))).toBe("Hundewissen · Rasseportrait");
    expect(title(statisticsMeta(args))).toBe("Statistik · Rasseportrait");
    expect(title(imprintMeta(args))).toBe("Impressum · Rasseportrait");
  });
});
