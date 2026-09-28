import React from "react";
import { screen } from "@testing-library/react";
import { renderWithProviders } from "~/test-utils";
import LoadingSpinner from "../LoadingSpinner";

describe("LoadingSpinner", () => {
  it("announces the default German loading message", () => {
    renderWithProviders(<LoadingSpinner />);

    expect(screen.getByRole("status")).toHaveTextContent("Wird geladen …");
  });

  it("announces a custom message", () => {
    renderWithProviders(<LoadingSpinner message="Rassen werden geladen …" />);

    expect(screen.getByRole("status")).toHaveTextContent(
      "Rassen werden geladen …",
    );
  });
});
