import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { MantineProvider } from "@mantine/core";
import BreedSearch from "../BreedSearch";
import * as breedsStore from "../../../stores/breeds";

// Mock the breeds store
jest.mock("../../../stores/breeds", () => ({
  useBreedActions: jest.fn(),
}));

describe("BreedSearch", () => {
  const mockSetSearch = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();

    (breedsStore.useBreedActions as jest.Mock).mockReturnValue({
      setSearch: mockSetSearch,
      initialize: jest.fn(),
      setSelectedBreed: jest.fn(),
      setRawBreeds: jest.fn(),
      setBreeds: jest.fn(),
      setBreed: jest.fn(),
      addBreed: jest.fn(),
      setSort: jest.fn(),
    });
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  const renderWithProvider = (ui: React.ReactElement) => {
    return render(<MantineProvider>{ui}</MantineProvider>);
  };

  describe("Rendering", () => {
    it("should render search input", () => {
      renderWithProvider(<BreedSearch />);

      const input = screen.getByRole("searchbox");
      expect(input).toBeInTheDocument();
    });

    it("should have correct placeholder text", () => {
      renderWithProvider(<BreedSearch />);

      const input = screen.getByPlaceholderText(
        "Suche nach Rassenamen oder FCI-Nummern",
      );
      expect(input).toBeInTheDocument();
    });

    it("should have correct aria-label for accessibility", () => {
      renderWithProvider(<BreedSearch />);

      const input = screen.getByLabelText(
        "Search for dog breeds by name or FCI number",
      );
      expect(input).toBeInTheDocument();
    });

    it("should start with empty value", () => {
      renderWithProvider(<BreedSearch />);

      const input = screen.getByRole("searchbox") as HTMLInputElement;
      expect(input.value).toBe("");
    });
  });

  describe("User Interaction", () => {
    it("should update input value when user types", async () => {
      const user = userEvent.setup({ delay: null });
      renderWithProvider(<BreedSearch />);

      const input = screen.getByRole("searchbox");
      await user.type(input, "Golden");

      expect(input).toHaveValue("Golden");
    });

    it("should allow clearing the input", async () => {
      const user = userEvent.setup({ delay: null });
      renderWithProvider(<BreedSearch />);

      const input = screen.getByRole("searchbox");
      await user.type(input, "Golden");
      expect(input).toHaveValue("Golden");

      await user.clear(input);
      expect(input).toHaveValue("");
    });

    it("should handle special characters in search", async () => {
      const user = userEvent.setup({ delay: null });
      renderWithProvider(<BreedSearch />);

      const input = screen.getByRole("searchbox");
      await user.type(input, "Test-123 & More");

      expect(input).toHaveValue("Test-123 & More");
    });
  });

  describe("Debounced Search", () => {
    it("should debounce search calls by 300ms", async () => {
      const user = userEvent.setup({ delay: null });
      renderWithProvider(<BreedSearch />);

      // Clear initial mount call
      jest.advanceTimersByTime(300);
      await waitFor(() => {
        expect(mockSetSearch).toHaveBeenCalledWith({ needle: "" });
      });
      mockSetSearch.mockClear();

      const input = screen.getByRole("searchbox");

      // Type multiple characters quickly
      await user.type(input, "Golden");

      // Should not have called setSearch yet (debouncing)
      expect(mockSetSearch).not.toHaveBeenCalled();

      // Fast-forward time by 300ms
      jest.advanceTimersByTime(300);

      // Now it should have been called
      await waitFor(() => {
        expect(mockSetSearch).toHaveBeenCalledWith({ needle: "Golden" });
      });
    });

    it("should only call setSearch once after debounce delay", async () => {
      const user = userEvent.setup({ delay: null });
      renderWithProvider(<BreedSearch />);

      const input = screen.getByRole("searchbox");

      await user.type(input, "Test");

      // Fast-forward
      jest.advanceTimersByTime(300);

      await waitFor(() => {
        expect(mockSetSearch).toHaveBeenCalledTimes(1);
      });
    });

    it("should reset debounce timer on new input", async () => {
      const user = userEvent.setup({ delay: null });
      renderWithProvider(<BreedSearch />);

      // Clear initial mount call
      jest.advanceTimersByTime(300);
      await waitFor(() => {
        expect(mockSetSearch).toHaveBeenCalledWith({ needle: "" });
      });
      mockSetSearch.mockClear();

      const input = screen.getByRole("searchbox");

      // Type first character
      await user.type(input, "G");

      // Wait 200ms (not enough to trigger)
      jest.advanceTimersByTime(200);
      expect(mockSetSearch).not.toHaveBeenCalled();

      // Type another character (should reset timer)
      await user.type(input, "o");

      // Wait another 200ms (still not 300ms since last input)
      jest.advanceTimersByTime(200);
      expect(mockSetSearch).not.toHaveBeenCalled();

      // Wait remaining 100ms
      jest.advanceTimersByTime(100);

      await waitFor(() => {
        expect(mockSetSearch).toHaveBeenCalledWith({ needle: "Go" });
      });
    });

    it("should call setSearch with empty string after clearing", async () => {
      const user = userEvent.setup({ delay: null });
      renderWithProvider(<BreedSearch />);

      const input = screen.getByRole("searchbox");

      // Type something
      await user.type(input, "Test");
      jest.advanceTimersByTime(300);

      await waitFor(() => {
        expect(mockSetSearch).toHaveBeenCalledWith({ needle: "Test" });
      });

      mockSetSearch.mockClear();

      // Clear the input
      await user.clear(input);
      jest.advanceTimersByTime(300);

      await waitFor(() => {
        expect(mockSetSearch).toHaveBeenCalledWith({ needle: "" });
      });
    });
  });

  describe("Search Functionality", () => {
    it("should trigger search with partial breed name", async () => {
      const user = userEvent.setup({ delay: null });
      renderWithProvider(<BreedSearch />);

      const input = screen.getByRole("searchbox");
      await user.type(input, "Gol");

      jest.advanceTimersByTime(300);

      await waitFor(() => {
        expect(mockSetSearch).toHaveBeenCalledWith({ needle: "Gol" });
      });
    });

    it("should trigger search with FCI number", async () => {
      const user = userEvent.setup({ delay: null });
      renderWithProvider(<BreedSearch />);

      const input = screen.getByRole("searchbox");
      await user.type(input, "111");

      jest.advanceTimersByTime(300);

      await waitFor(() => {
        expect(mockSetSearch).toHaveBeenCalledWith({ needle: "111" });
      });
    });

    it("should handle rapid typing correctly", async () => {
      const user = userEvent.setup({ delay: null });
      renderWithProvider(<BreedSearch />);

      // Clear initial mount call
      jest.advanceTimersByTime(300);
      await waitFor(() => {
        expect(mockSetSearch).toHaveBeenCalledWith({ needle: "" });
      });
      mockSetSearch.mockClear();

      const input = screen.getByRole("searchbox");

      // Rapidly type a word
      await user.type(input, "Golden Retriever");

      // Only advance timer once after all typing
      jest.advanceTimersByTime(300);

      await waitFor(() => {
        expect(mockSetSearch).toHaveBeenCalledWith({
          needle: "Golden Retriever",
        });
        // Should only be called once despite multiple keystrokes
        expect(mockSetSearch).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe("Edge Cases", () => {
    it("should handle spaces at the start and end", async () => {
      const user = userEvent.setup({ delay: null });
      renderWithProvider(<BreedSearch />);

      const input = screen.getByRole("searchbox");
      await user.type(input, "  Golden  ");

      jest.advanceTimersByTime(300);

      await waitFor(() => {
        expect(mockSetSearch).toHaveBeenCalledWith({ needle: "  Golden  " });
      });
    });

    it("should handle only spaces", async () => {
      const user = userEvent.setup({ delay: null });
      renderWithProvider(<BreedSearch />);

      const input = screen.getByRole("searchbox");
      await user.type(input, "   ");

      jest.advanceTimersByTime(300);

      await waitFor(() => {
        expect(mockSetSearch).toHaveBeenCalledWith({ needle: "   " });
      });
    });

    it("should handle very long search strings", async () => {
      const user = userEvent.setup({ delay: null });
      renderWithProvider(<BreedSearch />);

      const longString = "A".repeat(200);
      const input = screen.getByRole("searchbox");
      await user.type(input, longString);

      jest.advanceTimersByTime(300);

      await waitFor(() => {
        expect(mockSetSearch).toHaveBeenCalledWith({ needle: longString });
      });
    });
  });

  describe("Accessibility", () => {
    it("should have proper role attribute", () => {
      renderWithProvider(<BreedSearch />);

      const searchbox = screen.getByRole("searchbox");
      expect(searchbox).toBeInTheDocument();
    });

    it("should be keyboard accessible", async () => {
      const user = userEvent.setup({ delay: null });
      renderWithProvider(<BreedSearch />);

      const input = screen.getByRole("searchbox");

      // Should be able to tab to it
      await user.tab();
      expect(input).toHaveFocus();

      // Should be able to type
      await user.keyboard("Test");
      expect(input).toHaveValue("Test");
    });
  });
});
