import { makeBreed, makePodcast } from "~/test-utils";
import {
  getPortraitsPerFciGroup,
  getPortraitsPerYear,
  getStatistics,
} from "../utils";

const presented = (id: number, airDate: string, group?: number) =>
  makeBreed({
    id,
    classification: {
      fci: group ? { group, section: 1, standardNumber: id } : undefined,
    },
    podcast: [makePodcast({ meta: { airDate } as never })],
  });

const mentionedOnly = makeBreed({
  id: 255,
  podcast: [makePodcast({ meta: { internal: "other" } as never })],
});

describe("getPortraitsPerYear", () => {
  it("counts presented breeds per year from the first to the last portrait", () => {
    const result = getPortraitsPerYear([
      presented(1, "2021-10-19"),
      presented(2, "2023-02-01"),
      presented(3, "2023-11-30"),
      presented(4, "2026-06-04"),
      mentionedOnly,
    ]);

    expect(result.years).toEqual([
      { year: 2021, count: 1 },
      { year: 2022, count: 0 },
      { year: 2023, count: 2 },
      { year: 2024, count: 0 },
      { year: 2025, count: 0 },
      { year: 2026, count: 1 },
    ]);
    expect(result.firstAirDate).toBe("2021-10-19");
    expect(result.lastAirDate).toBe("2026-06-04");
  });

  it("is empty without portraits", () => {
    expect(getPortraitsPerYear([mentionedOnly])).toEqual({
      years: [],
      firstAirDate: undefined,
      lastAirDate: undefined,
    });
  });
});

describe("getPortraitsPerFciGroup", () => {
  it("counts presented breeds for each of the ten groups and those without FCI", () => {
    const result = getPortraitsPerFciGroup([
      presented(1, "2022-01-01", 2),
      presented(2, "2022-01-01", 2),
      presented(3, "2022-01-01", 1),
      presented(4, "2022-01-01"),
      mentionedOnly,
    ]);

    expect(result.groups).toHaveLength(10);
    expect(result.groups[0]).toEqual({ group: 1, count: 1 });
    expect(result.groups[1]).toEqual({ group: 2, count: 2 });
    expect(result.groups[9]).toEqual({ group: 10, count: 0 });
    expect(result.withoutFci).toBe(1);
  });
});

describe("getStatistics guess rates", () => {
  it("reports 0 instead of NaN when nobody guessed", () => {
    const result = getStatistics([presented(1, "2022-01-01", 1)]);

    expect(result.katharinaCorrectGuessesPercentage).toBe(0);
  });
});
