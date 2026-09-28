import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MantineProvider } from "@mantine/core";
import { MemoryRouter } from "react-router";
import { Menu } from "..";

jest.mock("../../../hooks/useAmplitude", () => ({
  useAmplitude: () => ({ track: jest.fn() }),
}));

const renderMenu = () =>
  render(
    <MantineProvider>
      <MemoryRouter>
        <Menu />
      </MemoryRouter>
    </MantineProvider>,
  );

describe("Menu", () => {
  it("labels the burger in German and reflects the open state", () => {
    renderMenu();

    const burger = screen.getByRole("button", { name: "Menü öffnen" });
    fireEvent.click(burger);

    expect(
      screen.getByRole("button", { name: "Menü schließen" }),
    ).toBeInTheDocument();
  });
});
