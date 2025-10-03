import React from "react";
import { render, screen } from "@testing-library/react";
import { MantineProvider } from "@mantine/core";
import { describe, expect, it, jest } from "@jest/globals";
import type { Mock } from "jest-mock";
import Rasseportrait from "../Rasseportrait";

// Mock the hooks
jest.mock("../../../stores/breeds", () => ({
  useAllBreeds: jest.fn(),
  useBreeds: jest.fn(),
  useBreedActions: jest.fn(),
  useSearch: jest.fn(),
  useSortBy: jest.fn(),
  useSortOrder: jest.fn(),
  useLoading: jest.fn(),
  useError: jest.fn(),
  useInitialized: jest.fn(),
  useSelectedBreedId: jest.fn(),
}));

jest.mock("../../../hooks/useAmplitude", () => ({
  useAmplitude: jest.fn(),
}));

jest.mock("../../../components/BreedCard", () => ({
  BreedCard: () => <div data-testid="breed-card">BreedCard</div>,
}));

jest.mock("../../../components/Modal", () => ({
  Modal: () => <div data-testid="modal">Modal</div>,
}));

jest.mock("../../../components/BreedSearch", () => ({
  BreedSearch: () => <div data-testid="breed-search">BreedSearch</div>,
}));

jest.mock("../../../components/LoadingSpinner", () => ({
  __esModule: true,
  default: ({ message }: { message?: string }) => (
    <div role="progressbar" data-testid="loading-spinner">
      {message}
    </div>
  ),
}));

// Import after mocks
import {
  useAllBreeds,
  useBreeds,
  useBreedActions,
  useSearch,
  useSortBy,
  useSortOrder,
  useLoading,
  useError,
  useInitialized,
  useSelectedBreedId,
} from "../../../stores/breeds";
import { useAmplitude } from "../../../hooks/useAmplitude";

// Test helper to render with MantineProvider
const renderWithMantine = (component: React.ReactElement) => {
  return render(<MantineProvider>{component}</MantineProvider>);
};

describe("Rasseportrait Page", () => {
  const mockTrack = jest.fn();
  const mockInitialize = jest.fn();
  const mockSetSearch = jest.fn();
  const mockSetSort = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useAmplitude as unknown as Mock).mockReturnValue({
      track: mockTrack,
      init: jest.fn(),
    });
    (useBreedActions as unknown as Mock).mockReturnValue({
      initialize: mockInitialize,
      setSearch: mockSetSearch,
      setSort: mockSetSort,
    });
    (useSearch as unknown as Mock).mockReturnValue({ needle: "", results: [] });
    (useSortBy as unknown as Mock).mockReturnValue("airDate");
    (useSortOrder as unknown as Mock).mockReturnValue("desc");
    (useLoading as unknown as Mock).mockReturnValue(false);
    (useError as unknown as Mock).mockReturnValue(null);
    (useInitialized as unknown as Mock).mockReturnValue(true);
    (useBreeds as unknown as Mock).mockReturnValue([]);
    (useAllBreeds as unknown as Mock).mockReturnValue([]);
    (useSelectedBreedId as unknown as Mock).mockReturnValue(undefined);
  });

  it("should render without crashing", () => {
    const { container } = renderWithMantine(<Rasseportrait />);
    expect(container).toBeTruthy();
  });

  it("should display loading state when loading is true", () => {
    (useLoading as unknown as Mock).mockReturnValue(true);
    (useInitialized as unknown as Mock).mockReturnValue(false);

    renderWithMantine(<Rasseportrait />);

    // Check if loading indicator is present
    const loadingElement = screen.queryByRole("progressbar");
    expect(loadingElement).toBeTruthy();
  });

  it("should display error alert when error state is present", () => {
    (useError as unknown as Mock).mockReturnValue("Failed to load breeds");
    (useInitialized as unknown as Mock).mockReturnValue(false);

    renderWithMantine(<Rasseportrait />);

    // Check if error message is displayed (may appear multiple times in title/body)
    const errorTexts = screen.queryAllByText(/Failed to load breeds/i);
    expect(errorTexts.length).toBeGreaterThan(0);
  });

  it("should initialize breeds on mount", () => {
    (useInitialized as unknown as Mock).mockReturnValue(false);

    renderWithMantine(<Rasseportrait />);

    // Should call initialize when not initialized
    expect(mockInitialize).toHaveBeenCalled();
  });

  it("should not initialize breeds if already initialized", () => {
    (useInitialized as unknown as Mock).mockReturnValue(true);

    renderWithMantine(<Rasseportrait />);

    // Should not call initialize when already initialized
    expect(mockInitialize).not.toHaveBeenCalled();
  });
});
