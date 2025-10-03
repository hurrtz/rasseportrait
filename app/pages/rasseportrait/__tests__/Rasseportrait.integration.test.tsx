import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { MantineProvider } from "@mantine/core";
import Rasseportrait from "../Rasseportrait";
import * as breedsStore from "../../../stores/breeds";
import type { Breed } from "types/breed";
import { LOADING_MESSAGE } from "~/constants";

// Mock modules
jest.mock("../../../components/BreedSearch", () => ({
  BreedSearch: () => <div data-testid="breed-search">Breed Search</div>,
}));

jest.mock("../../../components/Modal", () => ({
  Modal: ({ isOpen, close }: { isOpen: boolean; close: () => void }) =>
    isOpen ? (
      <div data-testid="modal">
        <button onClick={close} data-testid="close-modal">
          Close
        </button>
      </div>
    ) : null,
}));

jest.mock("../../../components/LoadingSpinner", () => ({
  __esModule: true,
  default: ({ message }: { message: string }) => (
    <div data-testid="loading-spinner">{message}</div>
  ),
}));

jest.mock("../../../hooks/useAmplitude", () => ({
  useAmplitude: () => ({
    track: jest.fn(),
  }),
}));

jest.mock("~/utils/logger", () => ({
  logger: {
    debug: jest.fn(),
    info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
  },
}));

jest.mock("../../../components/ErrorBoundary", () => ({
  ErrorBoundary: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

jest.mock("../../../components/BreedImages", () => ({
  BreedImages: () => <div data-testid="breed-images">Breed Images</div>,
  BreedImagesList: ({ onClick }: { onClick: () => void }) => (
    <div data-testid="breed-images-list" onClick={onClick}>
      Breed Images List
    </div>
  ),
  BreedImagesDetail: () => <div data-testid="breed-images-detail">Breed Images Detail</div>,
}));

// Test fixtures
const mockBreeds: Breed[] = [
  {
    id: 1,
    details: {
      internal: "test-breed-1",
      public: ["Test Breed 1"],
    },
    classification: {
      fci: {
        group: 1,
        section: 1,
        standardNumber: 101,
      },
    },
    podcast: [],
    furtherReading: [],
  },
  {
    id: 2,
    details: {
      internal: "test-breed-2",
      public: ["Test Breed 2"],
    },
    classification: {
      fci: {
        group: 2,
        section: 1,
        standardNumber: 201,
      },
    },
    podcast: [],
    furtherReading: [],
  },
  {
    id: 3,
    details: {
      internal: "test-breed-3",
      public: ["Test Breed 3"],
    },
    classification: {
      fci: {
        group: 1,
        section: 2,
        standardNumber: 102,
      },
    },
    podcast: [],
    furtherReading: [],
  },
];

describe("Rasseportrait Integration Tests", () => {
  const mockInitialize = jest.fn();
  const mockSetSelectedBreed = jest.fn();
  const mockSetSearch = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    // Default store state: initialized with breeds
    jest.spyOn(breedsStore, "useBreeds").mockReturnValue(mockBreeds);
    jest.spyOn(breedsStore, "useAllBreeds").mockReturnValue(mockBreeds);
    jest.spyOn(breedsStore, "useSearch").mockReturnValue({ needle: "" });
    jest.spyOn(breedsStore, "useSelectedBreedId").mockReturnValue(undefined);
    jest.spyOn(breedsStore, "useLoading").mockReturnValue(false);
    jest.spyOn(breedsStore, "useError").mockReturnValue(null);
    jest.spyOn(breedsStore, "useInitialized").mockReturnValue(true);
    jest.spyOn(breedsStore, "useBreed").mockImplementation((id: Breed["id"]) =>
      mockBreeds.find((breed) => breed.id === id),
    );
    jest.spyOn(breedsStore, "useBreedVariantNames").mockReturnValue([]);
    jest.spyOn(breedsStore, "useBreedActions").mockReturnValue({
      initialize: mockInitialize,
      setSelectedBreed: mockSetSelectedBreed,
      setSearch: mockSetSearch,
      setRawBreeds: jest.fn(),
      setBreeds: jest.fn(),
      setBreed: jest.fn(),
      addBreed: jest.fn(),
      setSort: jest.fn(),
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe("Complete User Workflows", () => {
    it("should complete full workflow: load → view breeds → select breed → close modal", async () => {
      const user = userEvent.setup();

      const { rerender } = render(
        <MantineProvider>
          <Rasseportrait />
        </MantineProvider>,
      );

      // Step 1: Page loads with all breeds displayed
      await waitFor(() => {
        expect(screen.getByText("Test Breed 1")).toBeInTheDocument();
      });
      expect(screen.getByText("Test Breed 2")).toBeInTheDocument();
      expect(screen.getByText("Test Breed 3")).toBeInTheDocument();

      // Step 2: User clicks on a breed card
      const breedCards = screen.getAllByTestId("breed-images-list");
      await user.click(breedCards[0]);

      // Verify breed selection was triggered
      expect(mockSetSelectedBreed).toHaveBeenCalledWith(1);

      // Step 3: Modal opens when breed is selected
      // Simulate store update after selection
      jest.spyOn(breedsStore, "useSelectedBreedId").mockReturnValue(1);

      rerender(
        <MantineProvider>
          <Rasseportrait />
        </MantineProvider>,
      );

      await waitFor(() => {
        expect(screen.getByTestId("modal")).toBeInTheDocument();
      });

      // Step 4: User closes modal
      const closeButton = screen.getByTestId("close-modal");
      await user.click(closeButton);

      // Verify cleanup actions
      expect(mockSetSelectedBreed).toHaveBeenCalledWith(undefined);
    });

    it("should complete search workflow: search → filter results → clear search", async () => {
      const user = userEvent.setup();

      const { rerender } = render(
        <MantineProvider>
          <Rasseportrait />
        </MantineProvider>,
      );

      // Initial state: all breeds visible
      expect(screen.getByText("Test Breed 1")).toBeInTheDocument();
      expect(screen.getByText("Test Breed 2")).toBeInTheDocument();
      expect(screen.getByText("Test Breed 3")).toBeInTheDocument();

      // Simulate search being performed (needle updated in store)
      jest.spyOn(breedsStore, "useSearch").mockReturnValue({ needle: "breed 1" });
      jest.spyOn(breedsStore, "useBreeds").mockReturnValue([mockBreeds[0]]);

      rerender(
        <MantineProvider>
          <Rasseportrait />
        </MantineProvider>,
      );

      // After search: only matching breed visible
      await waitFor(() => {
        expect(screen.getByText("Test Breed 1")).toBeInTheDocument();
      });
      expect(screen.queryByText("Test Breed 2")).not.toBeInTheDocument();
      expect(screen.queryByText("Test Breed 3")).not.toBeInTheDocument();

      // Clear search
      jest.spyOn(breedsStore, "useSearch").mockReturnValue({ needle: "" });
      jest.spyOn(breedsStore, "useBreeds").mockReturnValue(mockBreeds);

      rerender(
        <MantineProvider>
          <Rasseportrait />
        </MantineProvider>,
      );

      // All breeds visible again
      await waitFor(() => {
        expect(screen.getByText("Test Breed 1")).toBeInTheDocument();
      });
      expect(screen.getByText("Test Breed 2")).toBeInTheDocument();
      expect(screen.getByText("Test Breed 3")).toBeInTheDocument();
    });

    it("should handle initialization → loading → success workflow", async () => {
      // Start uninitialized
      jest.spyOn(breedsStore, "useInitialized").mockReturnValue(false);
      jest.spyOn(breedsStore, "useLoading").mockReturnValue(false);
      jest.spyOn(breedsStore, "useBreeds").mockReturnValue([]);

      const { rerender } = render(
        <MantineProvider>
          <Rasseportrait />
        </MantineProvider>,
      );

      // Should show initializing state
      expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();
      expect(screen.getByText(LOADING_MESSAGE)).toBeInTheDocument();

      // Verify initialization was called
      await waitFor(() => {
        expect(mockInitialize).toHaveBeenCalled();
      });

      // Simulate loading state
      jest.spyOn(breedsStore, "useLoading").mockReturnValue(true);

      rerender(
        <MantineProvider>
          <Rasseportrait />
        </MantineProvider>,
      );

      // Should show loading state
      await waitFor(() => {
        expect(screen.getByText(LOADING_MESSAGE)).toBeInTheDocument();
      });

      // Simulate successful load
      jest.spyOn(breedsStore, "useLoading").mockReturnValue(false);
      jest.spyOn(breedsStore, "useInitialized").mockReturnValue(true);
      jest.spyOn(breedsStore, "useBreeds").mockReturnValue(mockBreeds);

      rerender(
        <MantineProvider>
          <Rasseportrait />
        </MantineProvider>,
      );

      // Should show breeds
      await waitFor(() => {
        expect(screen.getByText("Test Breed 1")).toBeInTheDocument();
      });
      expect(screen.getByText("Test Breed 2")).toBeInTheDocument();
      expect(screen.getByText("Test Breed 3")).toBeInTheDocument();
    });

    it("should handle error recovery workflow", async () => {
      // Start with error state
      jest.spyOn(breedsStore, "useError").mockReturnValue("Failed to load data");
      jest.spyOn(breedsStore, "useLoading").mockReturnValue(false);
      jest.spyOn(breedsStore, "useInitialized").mockReturnValue(true);

      const { rerender } = render(
        <MantineProvider>
          <Rasseportrait />
        </MantineProvider>,
      );

      // Should show error
      expect(screen.getByText("Failed to load breeds")).toBeInTheDocument();
      expect(screen.getByText("Failed to load data")).toBeInTheDocument();

      // Simulate error cleared and data loaded
      jest.spyOn(breedsStore, "useError").mockReturnValue(null);
      jest.spyOn(breedsStore, "useBreeds").mockReturnValue(mockBreeds);

      rerender(
        <MantineProvider>
          <Rasseportrait />
        </MantineProvider>,
      );

      // Should show breeds
      await waitFor(() => {
        expect(screen.getByText("Test Breed 1")).toBeInTheDocument();
      });
      expect(screen.queryByText("Failed to load breeds")).not.toBeInTheDocument();
    });

    it("should handle multiple breed selections in sequence", async () => {
      const user = userEvent.setup();

      const { rerender } = render(
        <MantineProvider>
          <Rasseportrait />
        </MantineProvider>,
      );

      // Select first breed
      const breedCards = screen.getAllByTestId("breed-images-list");
      await user.click(breedCards[0]);
      expect(mockSetSelectedBreed).toHaveBeenCalledWith(1);

      // Simulate modal open for breed 1
      jest.spyOn(breedsStore, "useSelectedBreedId").mockReturnValue(1);
      rerender(
        <MantineProvider>
          <Rasseportrait />
        </MantineProvider>,
      );

      await waitFor(() => {
        expect(screen.getByTestId("modal")).toBeInTheDocument();
      });

      // Close modal
      const closeButton = screen.getByTestId("close-modal");
      await user.click(closeButton);
      expect(mockSetSelectedBreed).toHaveBeenCalledWith(undefined);

      // Reset selection
      jest.spyOn(breedsStore, "useSelectedBreedId").mockReturnValue(undefined);
      mockSetSelectedBreed.mockClear();

      rerender(
        <MantineProvider>
          <Rasseportrait />
        </MantineProvider>,
      );

      // Select second breed
      const breedCards2 = screen.getAllByTestId("breed-images-list");
      await user.click(breedCards2[1]);
      expect(mockSetSelectedBreed).toHaveBeenCalledWith(2);

      // Verify modal opens for breed 2
      jest.spyOn(breedsStore, "useSelectedBreedId").mockReturnValue(2);
      rerender(
        <MantineProvider>
          <Rasseportrait />
        </MantineProvider>,
      );

      await waitFor(() => {
        expect(screen.getByTestId("modal")).toBeInTheDocument();
      });
    });

    it("should handle search while modal is open", async () => {
      const user = userEvent.setup();

      // Start with breed selected and modal open
      jest.spyOn(breedsStore, "useSelectedBreedId").mockReturnValue(1);

      const { rerender } = render(
        <MantineProvider>
          <Rasseportrait />
        </MantineProvider>,
      );

      // Modal should be open
      await waitFor(() => {
        expect(screen.getByTestId("modal")).toBeInTheDocument();
      });

      // User performs search while modal open
      jest.spyOn(breedsStore, "useSearch").mockReturnValue({ needle: "breed 2" });
      jest.spyOn(breedsStore, "useBreeds").mockReturnValue([mockBreeds[1]]);

      rerender(
        <MantineProvider>
          <Rasseportrait />
        </MantineProvider>,
      );

      // Modal should still be open
      expect(screen.getByTestId("modal")).toBeInTheDocument();

      // Only filtered breed should be visible in background
      await waitFor(() => {
        expect(screen.queryByText("Test Breed 1")).not.toBeInTheDocument();
      });
      expect(screen.getByText("Test Breed 2")).toBeInTheDocument();
      expect(screen.queryByText("Test Breed 3")).not.toBeInTheDocument();

      // Close modal
      const closeButton = screen.getByTestId("close-modal");
      await user.click(closeButton);

      // Search results should still be active
      jest.spyOn(breedsStore, "useSelectedBreedId").mockReturnValue(undefined);
      rerender(
        <MantineProvider>
          <Rasseportrait />
        </MantineProvider>,
      );

      expect(screen.getByText("Test Breed 2")).toBeInTheDocument();
      expect(screen.queryByText("Test Breed 1")).not.toBeInTheDocument();
    });
  });

  describe("Edge Cases and State Transitions", () => {
    it("should not initialize if already loading", () => {
      jest.spyOn(breedsStore, "useInitialized").mockReturnValue(false);
      jest.spyOn(breedsStore, "useLoading").mockReturnValue(true);

      render(
        <MantineProvider>
          <Rasseportrait />
        </MantineProvider>,
      );

      // Should not call initialize when already loading
      expect(mockInitialize).not.toHaveBeenCalled();
    });

    it("should handle empty breed list gracefully", () => {
      jest.spyOn(breedsStore, "useBreeds").mockReturnValue([]);
      jest.spyOn(breedsStore, "useAllBreeds").mockReturnValue([]);

      render(
        <MantineProvider>
          <Rasseportrait />
        </MantineProvider>,
      );

      // Should render without crashing
      expect(screen.getByTestId("breed-search")).toBeInTheDocument();
      // No breed cards should be present
      expect(screen.queryByText("Test Breed")).not.toBeInTheDocument();
    });

    it("should handle rapid breed selections", async () => {
      const user = userEvent.setup();

      render(
        <MantineProvider>
          <Rasseportrait />
        </MantineProvider>,
      );

      const breedCards = screen.getAllByTestId("breed-images-list");

      // Rapidly click multiple breeds
      await user.click(breedCards[0]);
      await user.click(breedCards[1]);
      await user.click(breedCards[2]);

      // Should have called setSelectedBreed for each
      expect(mockSetSelectedBreed).toHaveBeenCalledTimes(3);
      expect(mockSetSelectedBreed).toHaveBeenNthCalledWith(1, 1);
      expect(mockSetSelectedBreed).toHaveBeenNthCalledWith(2, 2);
      expect(mockSetSelectedBreed).toHaveBeenNthCalledWith(3, 3);
    });
  });
});
