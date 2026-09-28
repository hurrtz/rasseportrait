import React from "react";
import { fireEvent, screen } from "@testing-library/react";
import useBreedsStore from "~/stores/breeds";
import { renderWithProviders, resetBreedsStore } from "~/test-utils";
import { SortControl } from "..";

const mockTrack = jest.fn();
jest.mock("~/hooks/useAmplitude", () => ({
  useAmplitude: () => ({ track: mockTrack }),
}));

const sort = () => {
  const { sortBy, sortOrder } = useBreedsStore.getState();
  return { sortBy, sortOrder };
};

describe("SortControl", () => {
  beforeEach(() => {
    resetBreedsStore();
    mockTrack.mockClear();
  });

  it("offers Neueste, A–Z and FCI-Nummer with Neueste selected", () => {
    renderWithProviders(<SortControl />);

    const options = screen.getAllByRole("radio");
    expect(options.map((radio) => radio.getAttribute("value"))).toEqual([
      "airDate",
      "name",
      "fci",
    ]);
    expect(screen.getByRole("radio", { name: "Neueste" })).toBeChecked();
    expect(screen.getByRole("radio", { name: "A–Z" })).toBeInTheDocument();
    expect(
      screen.getByRole("radio", { name: "FCI-Nummer" }),
    ).toBeInTheDocument();
  });

  it("sorts A–Z ascending and tracks the change", () => {
    renderWithProviders(<SortControl />);

    fireEvent.click(screen.getByRole("radio", { name: "A–Z" }));

    expect(sort()).toEqual({ sortBy: "name", sortOrder: "asc" });
    expect(mockTrack).toHaveBeenCalledWith("Sort Changed", {
      sortBy: "name",
      sortOrder: "asc",
      previousSortBy: "airDate",
    });
  });

  it("has a compact menu for small screens", async () => {
    renderWithProviders(<SortControl />);

    fireEvent.click(screen.getByRole("button", { name: "Sortieren: Neueste" }));
    fireEvent.click(
      await screen.findByRole("menuitem", { name: "FCI-Nummer" }),
    );

    expect(sort()).toEqual({ sortBy: "fci", sortOrder: "asc" });
    expect(
      screen.getByRole("button", { name: "Sortieren: FCI-Nummer" }),
    ).toBeInTheDocument();
  });
});
