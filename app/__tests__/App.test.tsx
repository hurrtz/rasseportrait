import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { MantineProvider } from "@mantine/core";
import { MemoryRouter, Route, Routes, useLocation } from "react-router";
import App from "../App";

const CurrentPath = () => <p data-testid="path">{useLocation().pathname}</p>;

const renderAt = (path: string) =>
  render(
    <MantineProvider>
      <MemoryRouter initialEntries={[path]}>
        <App>
          <Routes>
            <Route path="*" element={<CurrentPath />} />
          </Routes>
        </App>
      </MemoryRouter>
    </MantineProvider>,
  );

describe("App shell", () => {
  afterEach(() => sessionStorage.clear());

  it("shows the header on regular pages", () => {
    renderAt("/statistiken");

    expect(screen.getByRole("banner")).toBeInTheDocument();
    expect(screen.getByRole("main")).toContainElement(
      screen.getByTestId("path"),
    );
  });

  it("renders the breed detail page without the global header", () => {
    renderAt("/rasse/border-collie");

    expect(screen.queryByRole("banner")).not.toBeInTheDocument();
  });

  it("keeps the header of a Hundewissen area to large screens", () => {
    renderAt("/hundewissen/zucht-rassen");

    expect(screen.getByRole("banner").parentElement).toHaveClass("rp-md-only");
  });

  it("shows the header of other Hundewissen pages everywhere", () => {
    renderAt("/hundewissen/zucht-rassen/qualzuchten");

    expect(screen.getByRole("banner").parentElement).not.toHaveClass("rp-md-only");
  });

  it("restores a deep link saved by the GitHub Pages 404 page", async () => {
    sessionStorage.setItem("redirectPath", "/hundewissen?topic=medizin");

    renderAt("/");

    await waitFor(() =>
      expect(screen.getByTestId("path")).toHaveTextContent("/hundewissen"),
    );
    expect(sessionStorage.getItem("redirectPath")).toBeNull();
  });
});
