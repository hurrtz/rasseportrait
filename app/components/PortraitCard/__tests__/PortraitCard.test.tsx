import React from "react";
import { fireEvent, screen } from "@testing-library/react";
import { makeBreed, makePodcast, renderWithProviders } from "~/test-utils";
import { toDisplayBreeds } from "~/utils/breed";
import { PortraitCard } from "..";

const mockTrack = jest.fn();
jest.mock("~/hooks/useAmplitude", () => ({
  useAmplitude: () => ({ track: mockTrack }),
}));

const renderCard = (...raw: Parameters<typeof makeBreed>[0][]) => {
  const [breed] = toDisplayBreeds(raw.map((overrides) => makeBreed(overrides)));
  renderWithProviders(<PortraitCard breed={breed} />);
  return breed;
};

describe("PortraitCard", () => {
  beforeEach(() => mockTrack.mockClear());

  it("links the whole card to the breed page", () => {
    renderCard({});

    const card = screen.getByRole("link", { name: "Details zu Border Collie" });
    expect(card).toHaveAttribute("href", "/rasse/border-collie");
    expect(card).toHaveTextContent("Border Collie");
    expect(card).toHaveTextContent("Folge 7 · ab 44:50");
  });

  it("shows the square thumbnail with the breed name as alt text", () => {
    renderCard({});

    const image = screen.getByAltText("Border Collie");
    expect(image).toHaveAttribute(
      "src",
      "/rasseportrait/illustrations/breeds/297/illustration_thumbnail.jpeg",
    );
    expect(image).toHaveAttribute("loading", "lazy");
    expect(image).toHaveAttribute("decoding", "async");
  });

  it("has a separate play link that opens Spotify at the timecode", () => {
    renderCard({});

    const play = screen.getByRole("link", {
      name: "Border Collie: Portrait ab 44:50 anhören",
    });
    expect(play).toHaveAttribute(
      "href",
      "https://open.spotify.com/episode/abc?t=2690",
    );
    expect(play).toHaveAttribute("target", "_blank");
    expect(play).toHaveAttribute("rel", "noopener");
    expect(
      screen.getByRole("link", { name: "Details zu Border Collie" }),
    ).not.toContainElement(play);
  });

  it("tracks a play click with its placement", () => {
    const breed = renderCard({});

    fireEvent.click(
      screen.getByRole("link", {
        name: "Border Collie: Portrait ab 44:50 anhören",
      }),
    );

    expect(mockTrack).toHaveBeenCalledWith("Play Clicked", {
      breedId: String(breed.id),
      breedName: "Border Collie",
      placement: "card",
      provider: "spotify",
      episodeNumber: 7,
      timecode: 2690,
    });
  });

  it("has no play link when the episode has no source", () => {
    renderCard({ podcast: [makePodcast({ sources: [] })] });

    expect(screen.queryByRole("link", { name: /anhören/ })).toBeNull();
  });

  it("marks breeds that are not officially presented yet", () => {
    renderCard({ details: { isOfficiallyPresented: false } });

    expect(screen.getByText("Noch nicht vorgestellt")).toBeInTheDocument();
  });

  it("shows the first variant and the variant count for grouped breeds", () => {
    renderCard(
      {
        id: 38,
        classification: { fci: { group: 1, section: 1, standardNumber: 38 } },
        details: {
          internal: "corgi_cardigan",
          public: ["Welsh Corgi Cardigan"],
          groupAs: "Corgi",
          variants: [{ internal: "cardigan", public: "Welsh Corgi Cardigan" }],
        },
      },
      {
        id: 39,
        classification: { fci: { group: 1, section: 1, standardNumber: 39 } },
        details: {
          internal: "corgi_pembroke",
          public: ["Welsh Corgi Pembroke"],
          groupAs: "Corgi",
          variants: [{ internal: "pembroke", public: "Welsh Corgi Pembroke" }],
        },
      },
    );

    const card = screen.getByRole("link", { name: "Details zu Corgi" });
    expect(card).toHaveAttribute("href", "/rasse/corgi");
    expect(card).toHaveTextContent("2 Varianten · Folge 7");
    expect(screen.getAllByRole("img")).toHaveLength(1);
    expect(
      screen.getByAltText("Corgi, Welsh Corgi Cardigan"),
    ).toBeInTheDocument();
  });

  it("names special episodes without the Folge prefix", () => {
    renderCard({ podcast: [makePodcast({ number: "Summer Edition #8" })] });

    expect(
      screen.getByRole("link", { name: "Details zu Border Collie" }),
    ).toHaveTextContent("Summer Edition #8 · ab 44:50");
  });
});
