import { DEFAULT_THEME, mergeMantineTheme } from "@mantine/core";
import { cssVariablesResolver, theme } from "../theme";

describe("theme", () => {
  const merged = mergeMantineTheme(DEFAULT_THEME, theme);

  it("makes the Tageslicht orange the primary colour instead of Mantine blue", () => {
    expect(merged.primaryColor).toBe("orange");
    expect(merged.colors.orange[merged.primaryShade as number]).toBe("#f58220");
  });

  it("maps Mantine body and text colours to the design tokens", () => {
    const { light } = cssVariablesResolver(merged);

    expect(light["--mantine-color-body"]).toBe("var(--rp-bg)");
    expect(light["--mantine-color-text"]).toBe("var(--rp-text)");
  });
});
