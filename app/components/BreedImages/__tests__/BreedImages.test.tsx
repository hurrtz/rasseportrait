import React from "react";
import { render, screen } from "@testing-library/react";
import { MantineProvider } from "@mantine/core";
import type { Breed } from "types/breed";
import BreedImages from "../BreedImages";
import { useBreed, useBreedVariantNames } from "../../../stores/breeds";

jest.mock("../../../stores/breeds", () => ({
  useBreed: jest.fn(),
  useBreedVariantNames: jest.fn(),
  useSelectedBreed: jest.fn(),
}));

jest.mock("@mantine/carousel", () => {
  const Carousel = ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  );
  Carousel.Slide = ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  );
  return { Carousel };
});

const baseBreed: Breed = {
  id: "ab12",
  originalId: 7,
  details: { internal: "border_collie", public: ["Border Collie"] },
  classification: { fci: { group: 1, section: 1, standardNumber: 297 } },
  podcast: [],
  furtherReading: [],
};

const renderImages = () =>
  render(
    <MantineProvider>
      <BreedImages id="ab12" />
    </MantineProvider>,
  );

describe("BreedImages", () => {
  it("gives a single illustration the breed name as alt text and loads it lazily", () => {
    (useBreed as jest.Mock).mockReturnValue(baseBreed);
    (useBreedVariantNames as jest.Mock).mockReturnValue([
      { id: 7, variant: "" },
    ]);

    renderImages();

    const image = screen.getByAltText("Border Collie");
    expect(image).toHaveAttribute("loading", "lazy");
    expect(image).toHaveAttribute("decoding", "async");
  });

  it("names the variant in the alt text of each variant illustration", () => {
    (useBreed as jest.Mock).mockReturnValue({
      ...baseBreed,
      details: {
        internal: "pudel",
        public: ["Pudel"],
        variants: [
          { internal: "gross", public: "Großpudel" },
          { internal: "zwerg", public: "Zwergpudel" },
        ],
      },
    });
    (useBreedVariantNames as jest.Mock).mockReturnValue([
      { id: 7, variant: "gross" },
      { id: 7, variant: "zwerg" },
    ]);

    renderImages();

    expect(screen.getByAltText("Pudel, Großpudel")).toBeInTheDocument();
    expect(screen.getByAltText("Pudel, Zwergpudel")).toBeInTheDocument();
  });
});
