import React, { useState } from "react";
import { fireEvent, screen } from "@testing-library/react";
import { renderWithProviders } from "~/test-utils";
import ErrorBoundary from "../ErrorBoundary";

jest.mock("~/utils/logger", () => ({
  logger: { error: jest.fn(), warn: jest.fn(), info: jest.fn() },
}));

let shouldThrow = true;
const Flaky = () => {
  if (shouldThrow) throw new Error("kaputt");
  return <p>alles gut</p>;
};

describe("ErrorBoundary", () => {
  beforeEach(() => {
    shouldThrow = true;
    jest.spyOn(console, "error").mockImplementation(() => undefined);
  });
  afterEach(() => jest.restoreAllMocks());

  it("explains the failure in German and can try again", () => {
    renderWithProviders(
      <ErrorBoundary>
        <Flaky />
      </ErrorBoundary>,
    );

    expect(screen.getByRole("alert")).toHaveTextContent(
      "Da ist etwas schiefgegangen.",
    );

    shouldThrow = false;
    fireEvent.click(screen.getByRole("button", { name: "Erneut versuchen" }));

    expect(screen.getByText("alles gut")).toBeInTheDocument();
  });
});
