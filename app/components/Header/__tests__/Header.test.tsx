import React from "react";
import {
  render,
  screen,
  fireEvent,
  within,
  waitFor,
} from "@testing-library/react";
import { MantineProvider } from "@mantine/core";
import { MemoryRouter } from "react-router";
import { Header } from "..";

const renderAt = (path: string) =>
  render(
    <MantineProvider>
      <MemoryRouter initialEntries={[path]}>
        <Header />
      </MemoryRouter>
    </MantineProvider>,
  );

const mainNav = () =>
  screen.getByRole("navigation", { name: "Hauptnavigation" });

describe("Header", () => {
  it("links the dog head and wordmark to the overview", () => {
    renderAt("/statistiken");

    const brand = screen.getByRole("link", { name: "Rasseportrait" });
    expect(brand).toHaveAttribute("href", "/");
    expect(within(brand).getByRole("presentation")).toHaveAttribute(
      "src",
      "/rasseportrait/logo_reduced.png",
    );
  });

  it("lists the four pages in the main navigation", () => {
    renderAt("/");

    const links = within(mainNav()).getAllByRole("link");
    expect(links.map((link) => link.textContent)).toEqual([
      "Portraits",
      "Hundewissen",
      "Statistik",
      "Impressum",
    ]);
    expect(links.map((link) => link.getAttribute("href"))).toEqual([
      "/",
      "/hundewissen",
      "/statistiken",
      "/impressum",
    ]);
  });

  it.each([
    ["/", "Portraits"],
    ["/rasse/border-collie", "Portraits"],
    ["/hundewissen", "Hundewissen"],
    ["/statistiken", "Statistik"],
    ["/impressum", "Impressum"],
  ])("marks the current page on %s", (path, current) => {
    renderAt(path);

    const active = within(mainNav())
      .getAllByRole("link")
      .filter((link) => link.getAttribute("aria-current") === "page");
    expect(active.map((link) => link.textContent)).toEqual([current]);
  });

  it("opens a drawer with the page links from the menu button", async () => {
    renderAt("/hundewissen");

    fireEvent.click(screen.getByRole("button", { name: "Menü öffnen" }));

    const drawer = await screen.findByRole("dialog");
    const links = within(drawer).getAllByRole("link");
    expect(links.map((link) => link.textContent)).toEqual([
      "Portraits",
      "Hundewissen",
      "Statistik",
      "Impressum",
    ]);
    expect(
      within(drawer).getByRole("link", { name: "Hundewissen" }),
    ).toHaveAttribute("aria-current", "page");
  });

  it("closes the drawer with its close button", async () => {
    renderAt("/");

    fireEvent.click(screen.getByRole("button", { name: "Menü öffnen" }));
    const drawer = await screen.findByRole("dialog");
    fireEvent.click(
      within(drawer).getByRole("button", { name: "Menü schließen" }),
    );

    await waitFor(() =>
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument(),
    );
  });

  it("closes the drawer when a link is chosen", async () => {
    renderAt("/");

    fireEvent.click(screen.getByRole("button", { name: "Menü öffnen" }));
    const drawer = await screen.findByRole("dialog");
    fireEvent.click(within(drawer).getByRole("link", { name: "Statistik" }));

    await waitFor(() =>
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument(),
    );
    expect(
      within(mainNav()).getByRole("link", { name: "Statistik" }),
    ).toHaveAttribute("aria-current", "page");
  });
});
