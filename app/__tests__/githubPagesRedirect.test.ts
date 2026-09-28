import { readFileSync } from "fs";
import { join } from "path";

const html = readFileSync(join(__dirname, "../../public/404.html"), "utf8");

const runRedirectScript = (location: {
  pathname: string;
  search: string;
  hash: string;
}) => {
  const script = html.match(/<script>([\s\S]*?)<\/script>/)?.[1] ?? "";
  const stored = new Map<string, string>();
  const replace = jest.fn();
  const sessionStorage = {
    setItem: (key: string, value: string) => stored.set(key, value),
  };
  new Function("sessionStorage", "location", script)(sessionStorage, {
    ...location,
    replace,
  });
  return { stored, replace };
};

describe("public/404.html (GitHub Pages SPA fallback)", () => {
  it("is a German document", () => {
    expect(html).toMatch(/<html lang="de">/);
  });

  it("stores the deep link without the base path and returns to the app root", () => {
    const { stored, replace } = runRedirectScript({
      pathname: "/rasseportrait/hundewissen",
      search: "?topic=qualzuchten",
      hash: "#top",
    });

    expect(stored.get("redirectPath")).toBe(
      "/hundewissen?topic=qualzuchten#top",
    );
    expect(replace).toHaveBeenCalledWith("/rasseportrait/");
  });

  it("keeps nested paths such as the breed detail page", () => {
    const { stored } = runRedirectScript({
      pathname: "/rasseportrait/rasse/border-collie",
      search: "",
      hash: "",
    });

    expect(stored.get("redirectPath")).toBe("/rasse/border-collie");
  });
});
