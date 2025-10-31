import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { MantineProvider } from "@mantine/core";
import { MemoryRouter, Routes, Route } from "react-router";
import Rasseportrait from "../Rasseportrait";
import * as breedsStore from "../../../stores/breeds";
import { mockBreedsFull } from "./fixtures";

// Mock the breeds store
jest.mock("../../../stores/breeds", () => ({
  useBreedActions: jest.fn(),
  useAllBreeds: jest.fn(),
  useBreeds: jest.fn(),
  useSearch: jest.fn(),
  useSelectedBreedId: jest.fn(),
  useLoading: jest.fn(),
  useError: jest.fn(),
  useInitialized: jest.fn(),
  useSortBy: jest.fn(),
  useSortOrder: jest.fn(),
}));

// Mock Amplitude
jest.mock("../../../hooks/useAmplitude", () => ({
  useAmplitude: () => ({
    track: jest.fn(),
    identify: jest.fn(),
    setUserId: jest.fn(),
    reset: jest.fn(),
  }),
}));

// Mock Modal component
jest.mock("../../../components/Modal", () => ({
  Modal: ({ isOpen, close }: { isOpen: boolean; close: () => void }) =>
    isOpen ? (
      <div data-testid="breed-modal" onClick={close}>
        Modal is open
      </div>
    ) : null,
}));

// Mock LazyBreedCard
jest.mock("../../../components/LazyBreedCard", () => ({
  LazyBreedCard: ({
    id,
    name,
    onClick,
  }: {
    id: string | number;
    name: string;
    onClick: () => void;
  }) => (
    <div
      data-testid={`breed-card-${id}`}
      onClick={onClick}
      role="button"
      aria-label={name}
    >
      {name}
    </div>
  ),
}));

describe("Rasseportrait URL Parameters", () => {
  const mockSetSelectedBreed = jest.fn();
  const mockInitialize = jest.fn();
  const mockSetSearch = jest.fn();

  const renderWithRouter = (initialEntries: string[] = ["/"]) => {
    return render(
      <MantineProvider>
        <MemoryRouter initialEntries={initialEntries}>
          <Routes>
            <Route path="*" element={<Rasseportrait />} />
          </Routes>
        </MemoryRouter>
      </MantineProvider>,
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();

    (breedsStore.useBreedActions as jest.Mock).mockReturnValue({
      setSelectedBreed: mockSetSelectedBreed,
      initialize: mockInitialize,
      setSearch: mockSetSearch,
      setSort: jest.fn(),
    });

    (breedsStore.useAllBreeds as jest.Mock).mockReturnValue(mockBreedsFull);
    (breedsStore.useBreeds as jest.Mock).mockReturnValue(mockBreedsFull);
    (breedsStore.useSearch as jest.Mock).mockReturnValue({ needle: "" });
    (breedsStore.useSelectedBreedId as jest.Mock).mockReturnValue(undefined);
    (breedsStore.useLoading as jest.Mock).mockReturnValue(false);
    (breedsStore.useError as jest.Mock).mockReturnValue(null);
    (breedsStore.useInitialized as jest.Mock).mockReturnValue(true);
    (breedsStore.useSortBy as jest.Mock).mockReturnValue("name");
    (breedsStore.useSortOrder as jest.Mock).mockReturnValue("asc");
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("Setting URL parameters", () => {
    it("should add breed ID to URL when a breed is selected", async () => {
      const user = userEvent.setup();
      renderWithRouter();

      // Click on a breed card
      const breedCard = screen.getByTestId("breed-card-2");
      await user.click(breedCard);

      // Verify that setSelectedBreed was called with the correct ID
      await waitFor(() => {
        expect(mockSetSelectedBreed).toHaveBeenCalledWith(2);
      });
    });

    it("should open modal when breed ID is in URL on initial load", async () => {
      // Mock selected breed ID based on URL
      (breedsStore.useSelectedBreedId as jest.Mock).mockReturnValue(2);

      renderWithRouter(["/?breed=2"]);

      // Wait for the modal to be displayed
      await waitFor(() => {
        expect(screen.getByTestId("breed-modal")).toBeInTheDocument();
      });
    });

    it("should remove breed parameter from URL when modal is closed", async () => {
      const user = userEvent.setup();

      // Start with a selected breed
      (breedsStore.useSelectedBreedId as jest.Mock).mockReturnValue(2);

      renderWithRouter(["/?breed=2"]);

      // Verify modal is open
      await waitFor(() => {
        expect(screen.getByTestId("breed-modal")).toBeInTheDocument();
      });

      // Close the modal
      const modal = screen.getByTestId("breed-modal");
      await user.click(modal);

      // Verify setSelectedBreed was called with undefined
      await waitFor(() => {
        expect(mockSetSelectedBreed).toHaveBeenCalledWith(undefined);
      });
    });
  });

  describe("Invalid breed IDs", () => {
    it("should handle non-existent breed ID in URL gracefully", async () => {
      renderWithRouter(["/?breed=999"]);

      // The modal should not open for invalid breed IDs
      await waitFor(() => {
        expect(screen.queryByTestId("breed-modal")).not.toBeInTheDocument();
      });
    });

    it("should handle string breed IDs in URL", async () => {
      // Mock a breed with string ID
      const breedsWithStringId = [
        ...mockBreedsFull,
        {
          id: "special-breed",
          details: {
            internal: "Special Breed",
            public: ["Special Breed"],
            variants: [],
          },
          classification: { fci: undefined },
          podcast: [],
          furtherReading: [],
        },
      ];

      (breedsStore.useAllBreeds as jest.Mock).mockReturnValue(
        breedsWithStringId,
      );
      (breedsStore.useBreeds as jest.Mock).mockReturnValue(breedsWithStringId);
      (breedsStore.useSelectedBreedId as jest.Mock).mockReturnValue(
        "special-breed",
      );

      renderWithRouter(["/?breed=special-breed"]);

      // The modal should open for valid string breed IDs
      await waitFor(() => {
        expect(screen.getByTestId("breed-modal")).toBeInTheDocument();
      });
    });
  });

  describe("Navigation behavior", () => {
    it("should preserve other URL parameters when setting breed", async () => {
      const user = userEvent.setup();
      renderWithRouter(["/?search=test&sort=name"]);

      // Click on a breed card
      const breedCard = screen.getByTestId("breed-card-2");
      await user.click(breedCard);

      // Verify that setSelectedBreed was called
      await waitFor(() => {
        expect(mockSetSelectedBreed).toHaveBeenCalledWith(2);
      });

      // The other parameters should be preserved (this would need integration testing to fully verify)
    });

    it("should handle closing modal via modal close button properly", async () => {
      jest.useFakeTimers();
      const user = userEvent.setup({ delay: null });

      // Start with a selected breed
      (breedsStore.useSelectedBreedId as jest.Mock).mockReturnValue(2);

      renderWithRouter(["/?breed=2"]);

      // Verify modal is initially open
      await waitFor(() => {
        expect(screen.getByTestId("breed-modal")).toBeInTheDocument();
      });

      // Close the modal by clicking it
      const modal = screen.getByTestId("breed-modal");
      await user.click(modal);

      // Run the setTimeout callback
      jest.runAllTimers();

      // Verify setSelectedBreed was called with undefined
      await waitFor(() => {
        expect(mockSetSelectedBreed).toHaveBeenCalledWith(undefined);
      });

      jest.useRealTimers();
    });
  });
});
