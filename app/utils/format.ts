/**
 * German display formats used across the app.
 * Dates are ISO calendar dates ("2026-04-08"); they are formatted in UTC so
 * the viewer's time zone can never shift them by a day.
 */

const pad = (value: number) => String(value).padStart(2, "0");

/** 2690 → "44:50", 3728 → "1:02:08" (hours only from one hour on) */
export const formatTimecode = (totalSeconds: number): string => {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = Math.floor(totalSeconds % 60);

  return hours > 0
    ? `${hours}:${pad(minutes)}:${pad(seconds)}`
    : `${minutes}:${pad(seconds)}`;
};

const toUtcDate = (isoDate: string) => {
  const [year, month, day] = isoDate.split("-").map(Number);
  return new Date(Date.UTC(year, month - 1, day));
};

const longDate = new Intl.DateTimeFormat("de-DE", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

const shortDate = new Intl.DateTimeFormat("de-DE", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
  timeZone: "UTC",
});

const monthYear = new Intl.DateTimeFormat("de-DE", {
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

/** "2026-04-08" → "8. April 2026" */
export const formatDateLong = (isoDate: string) =>
  longDate.format(toUtcDate(isoDate));

/** "2026-04-08" → "08.04.2026" */
export const formatDateShort = (isoDate: string) =>
  shortDate.format(toUtcDate(isoDate));

/** "2021-10-19" → "Oktober 2021" */
export const formatMonthYear = (isoDate: string) =>
  monthYear.format(toUtcDate(isoDate));

const percent = new Intl.NumberFormat("de-DE", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

/** 47.2375 → "47,24 %" (non-breaking space, so the sign never wraps) */
export const formatPercent = (value: number) => `${percent.format(value)} %`;

/** 7 → "Folge 7"; named specials ("Summer Edition #8") stay as they are */
export const formatEpisode = (number: number | string) =>
  /^\d+$/.test(String(number)) ? `Folge ${number}` : String(number);
