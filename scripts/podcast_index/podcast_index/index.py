"""Post-processing of the per-episode extractions."""

from __future__ import annotations

import re
from datetime import date
from typing import Any

from .transcripts import seconds

# gap (s) up to which two sections on the same topic count as one
MERGE_GAP = 60
# deviation (s) from the breed data's portrait timecode that warrants a fix
PORTRAIT_TOLERANCE = 45
# the feed publishes RTL episodes ~2 weeks after the site date; further apart
# is a rerun, or another episode with the same number (the Mina era restarts)
SAME_EPISODE_DAYS = 60


def _days_apart(a: str, b: str) -> int:
    return abs((date.fromisoformat(a) - date.fromisoformat(b)).days)


def is_rerun(published: str, site_entry: dict[str, Any]) -> bool:
    """A feed episode published long after the site's air date of its title"""
    if not published or not site_entry.get("airDate"):
        return False
    return _days_apart(published, site_entry["airDate"]) > SAME_EPISODE_DAYS


def merge_segments(segments: list[dict[str, Any]], gap: int = MERGE_GAP) -> list[dict[str, Any]]:
    """Sort by start and join back-to-back sections on the same topic.

    A topic picked up again after a different topic stays a separate entry.
    """
    merged: list[dict[str, Any]] = []
    for segment in sorted(segments, key=lambda s: seconds(s["start"])):
        last = merged[-1] if merged else None
        if (
            last
            and last["topic"] == segment["topic"]
            and seconds(segment["start"]) - seconds(last["end"]) <= gap
        ):
            if seconds(segment["end"]) > seconds(last["end"]):
                last["end"] = segment["end"]
            if segment["weight"] == "main":
                last["weight"] = "main"
            last["summaries"].append(segment["summary"])
            continue
        entry = {k: v for k, v in segment.items() if k != "summary"}
        entry["summaries"] = [segment["summary"]]
        merged.append(entry)
    return merged


def normalize_title(title: str) -> str:
    title = title.lower().replace("&", " und ")
    return re.sub(r"[^a-z0-9äöüß]+", "", title)


def match_site_entry(
    title: str, number: int | str, site_entries: list[dict[str, Any]], published: str = ""
) -> dict[str, Any] | None:
    """The breed-data portrait entry of an episode: by title, else by a unique
    number of an episode aired around the same time"""
    wanted = normalize_title(title)
    for entry in site_entries:
        if normalize_title(entry["episode"]) == wanted:
            return entry
    same_number = [
        e
        for e in site_entries
        if isinstance(number, int) and e["number"] == number and not is_rerun(published, e)
    ]
    return same_number[0] if len(same_number) == 1 else None


def portrait_correction(
    site_entry: dict[str, Any], extracted_start: str, tolerance: int = PORTRAIT_TOLERANCE
) -> dict[str, Any] | None:
    """A new portrait timecode when the transcript clearly disagrees with the breed data"""
    found = seconds(extracted_start)
    if abs(found - site_entry["timecode"]) <= tolerance:
        return None
    return {"breed": site_entry["breed"], "from": site_entry["timecode"], "to": found}
