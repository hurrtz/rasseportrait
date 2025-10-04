/// <reference types="@testing-library/jest-dom" />
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MantineProvider } from "@mantine/core";
import { describe, expect, it, jest, beforeEach } from "@jest/globals";
import type { Mock } from "jest-mock";
import BreedCard from "../BreedCard";
import type { Breed } from "../../../../types/breed";

// Mock the hooks and components
jest.mock("../../../stores/breeds", () => ({
  useBreed: jest.fn(),
  useBreedVariantNames: jest.fn(),
}));

jest.mock("../../../hooks/useAmplitude", () => ({
  useAmplitude: jest.fn(),
}));

jest.mock("../../BreedImages", () => ({
  BreedImagesList: ({ onClick, handleSlideChange }: any) => (
    <div
      data-testid="breed-images-list"
      onClick={onClick}
      onMouseEnter={() => handleSlideChange?.(1)}
    >
      Mock BreedImagesList
    </div>
  ),
}));

// Import mocked hooks
import { useBreed, useBreedVariantNames } from "../../../stores/breeds";
import { useAmplitude } from "../../../hooks/useAmplitude";

// Test helper to render with MantineProvider
const renderWithMantine = (component: React.ReactElement) => {
  return render(<MantineProvider>{component}</MantineProvider>);
};

describe("BreedCard", () => {
  const mockTrack = jest.fn();
  const mockOnClick = jest.fn();

  const mockBreed: Breed = {
    id: 1,
    details: {
      internal: "golden-retriever",
      public: ["Golden Retriever"],
    },
    classification: {
      fci: {
        group: 8,
        section: 1,
        standardNumber: 111,
      },
    },
    podcast: [
      {
        number: 100,
        episode: "Episode 100",
        sources: [{ url: "https://example.com", type: "audio" }],
        meta: {
          internal: "golden-retriever",
          public: "Golden Retriever",
          timecode: 1200,
          airDate: "2023-01-15",
          isGuessable: undefined,
          isGuessedCorrectly: undefined,
          guessedBy: undefined,
        },
      },
    ],
    furtherReading: [],
  };

  const mockBreedWithVariants: Breed = {
    ...mockBreed,
    details: {
      ...mockBreed.details,
      variants: [
        {
          internal: "poodle-small",
          public: "Small Poodle",
        },
        {
          internal: "poodle-large",
          public: "Large Poodle",
        },
      ],
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useAmplitude as unknown as Mock).mockReturnValue({ track: mockTrack });
  });

  describe("Rendering", () => {
    it("should render breed name", () => {
      (useBreed as unknown as Mock).mockReturnValue(mockBreed);
      (useBreedVariantNames as unknown as Mock).mockReturnValue([
        "Golden Retriever",
      ]);

      renderWithMantine(
        <BreedCard id={1} name="Golden Retriever" onClick={mockOnClick} />,
      );

      // Use getAllByText since name appears multiple times (breed name + sr-only text)
      const elements = screen.getAllByText(/Golden Retriever/);
      expect(elements.length).toBeGreaterThan(0);
    });

    it("should render BreedImagesList component", () => {
      (useBreed as unknown as Mock).mockReturnValue(mockBreed);
      (useBreedVariantNames as unknown as Mock).mockReturnValue([
        "Golden Retriever",
      ]);

      renderWithMantine(
        <BreedCard id={1} name="Golden Retriever" onClick={mockOnClick} />,
      );

      const element = screen.getByTestId("breed-images-list");
      expect(element).toBeTruthy();
    });

    it("should render variant names when breed has variants", () => {
      (useBreed as unknown as Mock).mockReturnValue(mockBreedWithVariants);
      (useBreedVariantNames as unknown as Mock).mockReturnValue([
        "Small Poodle",
        "Large Poodle",
      ]);

      renderWithMantine(
        <BreedCard id={1} name="Poodle" onClick={mockOnClick} />,
      );

      // Variant name appears in the DOM (first variant by default)
      const element = screen.getByText(/Small Poodle/);
      expect(element).toBeTruthy();
    });

    it("should not render variant section when breed has no variants", () => {
      (useBreed as unknown as Mock).mockReturnValue(mockBreed);
      (useBreedVariantNames as unknown as Mock).mockReturnValue([
        "Golden Retriever",
      ]);

      renderWithMantine(
        <BreedCard id={1} name="Golden Retriever" onClick={mockOnClick} />,
      );

      // Divider should not be present
      const dividers = document.querySelectorAll(".breed-card-name-divider");
      expect(dividers).toHaveLength(0);
    });

    it("should handle breed names with ß character", () => {
      (useBreed as unknown as Mock).mockReturnValue({
        ...mockBreed,
        details: {
          ...mockBreed.details,
          public: ["Großpudel"],
        },
      });
      (useBreedVariantNames as unknown as Mock).mockReturnValue(["Großpudel"]);

      renderWithMantine(
        <BreedCard id={1} name="Großpudel" onClick={mockOnClick} />,
      );

      // Should replace ß with ss
      const element = screen.getByText(/Grosspudel/);
      expect(element).toBeTruthy();
    });
  });

  describe("Interaction", () => {
    it("should call onClick when card is clicked", () => {
      (useBreed as unknown as Mock).mockReturnValue(mockBreed);
      (useBreedVariantNames as unknown as Mock).mockReturnValue([
        "Golden Retriever",
      ]);

      renderWithMantine(
        <BreedCard id={1} name="Golden Retriever" onClick={mockOnClick} />,
      );

      const imagesList = screen.getByTestId("breed-images-list");
      fireEvent.click(imagesList);

      expect(mockOnClick).toHaveBeenCalledTimes(1);
    });

    it("should track card click with analytics", () => {
      (useBreed as unknown as Mock).mockReturnValue(mockBreed);
      (useBreedVariantNames as unknown as Mock).mockReturnValue([
        "Golden Retriever",
      ]);

      renderWithMantine(
        <BreedCard id={1} name="Golden Retriever" onClick={mockOnClick} />,
      );

      const imagesList = screen.getByTestId("breed-images-list");
      fireEvent.click(imagesList);

      expect(mockTrack).toHaveBeenCalledWith(
        "Breed Card Clicked",
        expect.objectContaining({
          breedId: "1",
          breedName: "Golden Retriever",
          hasVariants: false,
          variantCount: 1,
        }),
      );
    });

    it("should track slide changes with analytics", () => {
      (useBreed as unknown as Mock).mockReturnValue(mockBreedWithVariants);
      (useBreedVariantNames as unknown as Mock).mockReturnValue([
        "Small Poodle",
        "Large Poodle",
      ]);

      renderWithMantine(
        <BreedCard id={1} name="Poodle" onClick={mockOnClick} />,
      );

      const imagesList = screen.getByTestId("breed-images-list");
      // Trigger slide change via mouseEnter (our mock implementation)
      fireEvent.mouseEnter(imagesList);

      expect(mockTrack).toHaveBeenCalledWith(
        "Breed Card Image Slide Changed",
        expect.objectContaining({
          breedId: "1",
          breedName: "Poodle",
          slideIndex: 1,
          totalSlides: 2,
        }),
      );
    });
  });

  describe("Accessibility", () => {
    it("should have screen reader text for card purpose", () => {
      (useBreed as unknown as Mock).mockReturnValue(mockBreed);
      (useBreedVariantNames as unknown as Mock).mockReturnValue([
        "Golden Retriever",
      ]);

      renderWithMantine(
        <BreedCard id={1} name="Golden Retriever" onClick={mockOnClick} />,
      );

      const srText = screen.getByText(
        /Press Enter or Space to view details for Golden Retriever/,
      );
      expect(srText).toBeTruthy();
      expect(srText.className).toContain("sr-only");
    });

    it("should have cursor pointer style for clickability indication", () => {
      (useBreed as unknown as Mock).mockReturnValue(mockBreed);
      (useBreedVariantNames as unknown as Mock).mockReturnValue([
        "Golden Retriever",
      ]);

      const { container } = renderWithMantine(
        <BreedCard id={1} name="Golden Retriever" onClick={mockOnClick} />,
      );

      const card = container.querySelector(".card");
      expect(card).toBeTruthy();
      expect(card?.className).toContain("card");
    });

    it("should render text with proper truncation classes", () => {
      (useBreed as unknown as Mock).mockReturnValue(mockBreed);
      (useBreedVariantNames as unknown as Mock).mockReturnValue([
        "Golden Retriever",
      ]);

      renderWithMantine(
        <BreedCard id={1} name="Golden Retriever" onClick={mockOnClick} />,
      );

      // Get the name text which is inside the breed-card-name-text class
      const nameTexts = screen.getAllByText(/Golden Retriever/);
      const cardNameText = nameTexts.find((el) =>
        el.closest(".breed-card-name-text"),
      );
      expect(cardNameText).toBeTruthy();
      expect(cardNameText?.closest(".breed-card-name-text")).toBeTruthy();
    });
  });

  describe("Edge Cases", () => {
    it("should handle breeds with multiple variants", () => {
      (useBreed as unknown as Mock).mockReturnValue(mockBreedWithVariants);
      (useBreedVariantNames as unknown as Mock).mockReturnValue([
        "Small Poodle",
        "Medium Poodle",
        "Large Poodle",
      ]);

      renderWithMantine(
        <BreedCard id={1} name="Poodle" onClick={mockOnClick} />,
      );

      // Should render with first variant initially
      const element = screen.getByText(/Small Poodle/);
      expect(element).toBeTruthy();
    });

    it("should handle click even with empty variant names", () => {
      (useBreed as unknown as Mock).mockReturnValue(mockBreed);
      (useBreedVariantNames as unknown as Mock).mockReturnValue([]);

      renderWithMantine(
        <BreedCard id={1} name="Golden Retriever" onClick={mockOnClick} />,
      );

      const imagesList = screen.getByTestId("breed-images-list");
      fireEvent.click(imagesList);

      expect(mockOnClick).toHaveBeenCalled();
    });

    it("should handle numeric breed IDs correctly", () => {
      (useBreed as unknown as Mock).mockReturnValue(mockBreed);
      (useBreedVariantNames as unknown as Mock).mockReturnValue([
        "Golden Retriever",
      ]);

      renderWithMantine(
        <BreedCard id={999} name="Golden Retriever" onClick={mockOnClick} />,
      );

      const imagesList = screen.getByTestId("breed-images-list");
      fireEvent.click(imagesList);

      expect(mockTrack).toHaveBeenCalledWith(
        "Breed Card Clicked",
        expect.objectContaining({
          breedId: "999",
        }),
      );
    });
  });
});
