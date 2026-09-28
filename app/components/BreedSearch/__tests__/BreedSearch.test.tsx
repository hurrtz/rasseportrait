import React from "react";
import { act, fireEvent, screen } from "@testing-library/react";
import useBreedsStore from "~/stores/breeds";
import { renderWithProviders, resetBreedsStore } from "~/test-utils";
import BreedSearch from "../BreedSearch";

const query = () => useBreedsStore.getState().query;

describe("BreedSearch", () => {
  beforeEach(() => resetBreedsStore());

  it("is a labelled search field with a German placeholder", () => {
    renderWithProviders(<BreedSearch />);

    const input = screen.getByRole("searchbox", { name: "Rassen durchsuchen" });
    expect(input).toHaveAttribute("placeholder", "Rasse oder FCI-Nummer");
  });

  it("writes what is typed into the store", () => {
    renderWithProviders(<BreedSearch />);

    fireEvent.change(screen.getByRole("searchbox"), {
      target: { value: "Pudel" },
    });

    expect(query()).toBe("Pudel");
  });

  it("shows the stored query when it mounts again", () => {
    act(() => useBreedsStore.getState().actions.setQuery("Collie"));

    renderWithProviders(<BreedSearch />);

    expect(screen.getByRole("searchbox")).toHaveValue("Collie");
  });

  it("offers a clear button only while there is a query", () => {
    renderWithProviders(<BreedSearch />);
    expect(screen.queryByRole("button", { name: "Suche leeren" })).toBeNull();

    fireEvent.change(screen.getByRole("searchbox"), {
      target: { value: "Pudel" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Suche leeren" }));

    expect(query()).toBe("");
    expect(screen.getByRole("searchbox")).toHaveValue("");
    expect(screen.getByRole("searchbox")).toHaveFocus();
  });
});
