import React from "react";
import { act, fireEvent, screen, waitFor } from "@testing-library/react";
import { renderWithProviders } from "~/test-utils";
import type { EpisodeHit } from "types/hundewissen-search";
import TranscriptResults from "../TranscriptResults";
import {
  searchTranscripts,
  type TranscriptSearchResult,
} from "../transcriptSearch";

const mockTrack = jest.fn();
jest.mock("~/hooks/useAmplitude", () => ({
  useAmplitude: () => ({ track: mockTrack }),
}));
jest.mock("../transcriptSearch", () => ({
  ...jest.requireActual("../transcriptSearch"),
  searchTranscripts: jest.fn(),
}));
const mockSearch = jest.mocked(searchTranscripts);

const hit = (id = "rtl-205"): EpisodeHit => ({
  episode: {
    id,
    number: 205,
    title: `Biber ${id}`,
    published: "2025-02-20",
    audioUrl: "https://feed.example/205.mp3?v=2",
    passages: [],
  },
  passages: [
    {
      anchor: "s-1",
      start: 389,
      end: 570,
      summary: true,
      topics: [
        { id: "qualzuchten", area: "zucht-rassen", label: "Qualzuchten" },
      ],
      excerpt:
        "<mark>synbreed101x.</mark> Französische Bulldogge &lt;img onerror=evil&gt;",
    },
  ],
});
const result = (hits = [hit()]): TranscriptSearchResult => ({
  count: hits.length,
  load: jest.fn(async (offset, size) => hits.slice(offset, offset + size)),
});

describe("full-text result UI", () => {
  beforeEach(() => {
    mockSearch.mockReset();
    mockTrack.mockClear();
  });

  it("shows a highlighted excerpt, timed audio and topic links without interpreting transcript HTML", async () => {
    mockSearch.mockResolvedValue(result());
    renderWithProviders(<TranscriptResults query="french bulldog" />);
    expect(
      await screen.findByRole("heading", {
        name: "1 Folge für »french bulldog«",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Französische Bulldogge", { selector: "mark" }),
    ).toBeInTheDocument();
    expect(document.querySelector("img[onerror]")).toBeNull();
    expect(document.body.textContent).not.toContain("synbreed");
    const play = screen.getByRole("link", { name: /ab 6:29 anhören/ });
    expect(play).toHaveAttribute(
      "href",
      "https://feed.example/205.mp3?v=2#t=389",
    );
    expect(screen.getByRole("link", { name: "Qualzuchten" })).toHaveAttribute(
      "href",
      "/hundewissen/zucht-rassen/qualzuchten",
    );
    fireEvent.click(play);
    expect(mockTrack).toHaveBeenCalledWith("Hundewissen Search Result Played", {
      searchTerm: "french bulldog",
      episodeId: "rtl-205",
      timecode: 389,
      position: 1,
    });
  });

  it("reports no matches and skips requests for single characters", async () => {
    mockSearch.mockResolvedValue(result([]));
    const view = renderWithProviders(<TranscriptResults query="x" />);
    expect(mockSearch).not.toHaveBeenCalled();
    expect(
      screen.getByText("Gib mindestens zwei Zeichen ein."),
    ).toBeInTheDocument();
    view.rerender(<TranscriptResults query="unfindbar" />);
    expect(
      await screen.findByText("Keine Fundstellen für »unfindbar«"),
    ).toBeInTheDocument();
  });

  it("retries a failed search", async () => {
    mockSearch
      .mockRejectedValueOnce(new Error("offline"))
      .mockResolvedValueOnce(result());
    renderWithProviders(<TranscriptResults query="french bulldog" />);
    fireEvent.click(
      await screen.findByRole("button", { name: "Erneut versuchen" }),
    );
    expect(
      await screen.findByText("1 Folge für »french bulldog«"),
    ).toBeInTheDocument();
    expect(mockSearch).toHaveBeenCalledTimes(2);
  });

  it("loads six episodes at a time and preserves earlier results after a page-load failure", async () => {
    const found = result(Array.from({ length: 8 }, (_, i) => hit(`rtl-${i}`)));
    const load = jest
      .fn(found.load)
      .mockImplementationOnce(found.load)
      .mockRejectedValueOnce(new Error("offline"))
      .mockImplementation(found.load);
    mockSearch.mockResolvedValue({ ...found, load });
    renderWithProviders(<TranscriptResults query="french bulldog" />);
    fireEvent.click(
      await screen.findByRole("button", { name: "Weitere Folgen zeigen" }),
    );
    fireEvent.click(
      await screen.findByRole("button", { name: /Laden fehlgeschlagen/ }),
    );
    await waitFor(() => expect(screen.getAllByRole("article")).toHaveLength(8));
    expect(load.mock.calls).toEqual([
      [0, 6],
      [6, 6],
      [6, 6],
    ]);
  });

  it("ignores old responses when a new query finishes first", async () => {
    let finishOld!: (value: TranscriptSearchResult) => void;
    mockSearch
      .mockReturnValueOnce(
        new Promise((resolve) => {
          finishOld = resolve;
        }),
      )
      .mockResolvedValueOnce(result([]));
    const view = renderWithProviders(<TranscriptResults query="old" />);
    view.rerender(<TranscriptResults query="new" />);
    expect(
      await screen.findByText("Keine Fundstellen für »new«"),
    ).toBeInTheDocument();
    await act(async () => {
      finishOld(result());
    });
    expect(screen.queryByRole("article")).not.toBeInTheDocument();
    expect(mockTrack).not.toHaveBeenCalledWith(
      "Hundewissen Full Text Search Performed",
      expect.objectContaining({ searchTerm: "old" }),
    );
  });
});
