import React from "react";
import { render, screen } from "@testing-library/react";
import { MantineProvider } from "@mantine/core";
import LoadingSpinner from "../LoadingSpinner";

describe("LoadingSpinner", () => {
  const renderWithProvider = (ui: React.ReactElement) => {
    return render(<MantineProvider>{ui}</MantineProvider>);
  };

  describe("Rendering", () => {
    it("should render with default message", () => {
      renderWithProvider(<LoadingSpinner />);

      expect(screen.getByText("Loading...")).toBeInTheDocument();
    });

    it("should render with custom message", () => {
      renderWithProvider(<LoadingSpinner message="Loading breeds..." />);

      expect(screen.getByText("Loading breeds...")).toBeInTheDocument();
    });

    it("should render without crashing", () => {
      const { container } = renderWithProvider(<LoadingSpinner />);

      // Should render the loading spinner container
      expect(container.firstChild).toBeTruthy();
    });

    it("should have correct structure with Stack layout", () => {
      const { container } = renderWithProvider(<LoadingSpinner />);

      const stack = container.querySelector(".loading-spinner");
      expect(stack).toBeInTheDocument();
    });
  });

  describe("Props", () => {
    it("should accept custom size prop", () => {
      // Component should render without crashing with size prop
      expect(() =>
        renderWithProvider(<LoadingSpinner size="xl" />),
      ).not.toThrow();
    });

    it("should accept custom color prop", () => {
      // Component should render without crashing with color prop
      expect(() =>
        renderWithProvider(<LoadingSpinner color="red" />),
      ).not.toThrow();
    });

    it("should use all custom props together", () => {
      renderWithProvider(
        <LoadingSpinner
          message="Custom loading message"
          size="lg"
          color="green"
        />,
      );

      expect(screen.getByText("Custom loading message")).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("should render text with proper styling for visibility", () => {
      renderWithProvider(<LoadingSpinner message="Accessible message" />);

      const text = screen.getByText("Accessible message");
      expect(text).toBeInTheDocument();
    });

    it("should render message as visible text for screen readers", () => {
      renderWithProvider(<LoadingSpinner message="Loading data" />);

      const message = screen.getByText("Loading data");
      expect(message).toBeVisible();
    });
  });

  describe("Edge Cases", () => {
    it("should handle empty string message", () => {
      renderWithProvider(<LoadingSpinner message="" />);

      // Should still render the structure
      const { container } = render(
        <MantineProvider>
          <LoadingSpinner message="" />
        </MantineProvider>,
      );
      const stack = container.querySelector(".loading-spinner");
      expect(stack).toBeInTheDocument();
    });

    it("should handle very long message", () => {
      const longMessage = "A".repeat(100);
      renderWithProvider(<LoadingSpinner message={longMessage} />);

      expect(screen.getByText(longMessage)).toBeInTheDocument();
    });

    it("should handle special characters in message", () => {
      const specialMessage = "Loading... <test> & 'quotes' \"double\"";
      renderWithProvider(<LoadingSpinner message={specialMessage} />);

      expect(screen.getByText(specialMessage)).toBeInTheDocument();
    });
  });
});
