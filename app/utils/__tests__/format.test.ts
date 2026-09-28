import {
  formatMonth,
  formatMonthYear,
  formatDateLong,
  formatDateShort,
  formatEpisode,
  formatPercent,
  formatTimecode,
} from "../format";

describe("formatTimecode", () => {
  it("formats minutes and seconds below one hour", () => {
    expect(formatTimecode(2690)).toBe("44:50");
    expect(formatTimecode(245)).toBe("4:05");
    expect(formatTimecode(45)).toBe("0:45");
  });

  it("adds hours only from one hour on", () => {
    expect(formatTimecode(3728)).toBe("1:02:08");
    expect(formatTimecode(3600)).toBe("1:00:00");
  });
});

describe("formatDateLong", () => {
  it("writes the German long date without a leading zero", () => {
    expect(formatDateLong("2026-04-08")).toBe("8. April 2026");
    expect(formatDateLong("2021-10-19")).toBe("19. Oktober 2021");
  });
});

describe("formatDateShort", () => {
  it("writes the German numeric date", () => {
    expect(formatDateShort("2026-04-08")).toBe("08.04.2026");
  });
});

describe("formatPercent", () => {
  it("uses a decimal comma, up to two decimals and a non-breaking space before %", () => {
    expect(formatPercent(47.2375)).toBe("47,24\u00a0%");
    expect(formatPercent(79.5)).toBe("79,5\u00a0%");
    expect(formatPercent(100)).toBe("100\u00a0%");
  });
});

describe("formatEpisode", () => {
  it("prefixes numbered episodes with Folge", () => {
    expect(formatEpisode(7)).toBe("Folge 7");
    expect(formatEpisode("12")).toBe("Folge 12");
  });

  it("keeps named specials as they are", () => {
    expect(formatEpisode("Summer Edition #8")).toBe("Summer Edition #8");
  });
});

describe("formatMonthYear", () => {
  it("writes month and year", () => {
    expect(formatMonthYear("2021-10-19")).toBe("Oktober 2021");
  });
});

describe("formatMonth", () => {
  it("writes the month name", () => {
    expect(formatMonth("2026-06-04")).toBe("Juni");
  });
});
