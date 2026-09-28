import React from "react";
import { screen, within } from "@testing-library/react";
import { renderWithProviders } from "~/test-utils";
import Imprint from "../Imprint";

describe("Impressum", () => {
  it("keeps purpose and contact as two titled sections", () => {
    renderWithProviders(<Imprint />);

    expect(
      screen.getByRole("heading", { level: 1, name: "Impressum" }),
    ).toBeInTheDocument();
    const purpose = screen.getByRole("region", { name: "Zweck" });
    expect(purpose).toHaveTextContent(
      "Diese Website ist ein Fanprojekt zum Podcast Tierisch Menschlich von Martin Rütter und Katharina Adick.",
    );
    const contact = screen.getByRole("region", { name: "Kontakt" });
    expect(
      within(contact).getByRole("link", {
        name: "rasseportrait@tobiaswinkler.berlin",
      }),
    ).toHaveAttribute("href", "mailto:rasseportrait@tobiaswinkler.berlin");
  });

  it("opens external links in a new tab without handing over the opener", () => {
    renderWithProviders(<Imprint />);

    const external = screen
      .getAllByRole("link")
      .filter((link) => link.getAttribute("href")?.startsWith("http"));
    expect(external.length).toBeGreaterThan(0);
    external.forEach((link) => {
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noopener");
    });
  });
});
