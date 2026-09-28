"""Portrait timecodes: compare the breed data with the transcripts and fix clear misses."""

from __future__ import annotations

import json
import re
from typing import Any

from .common import REPO


def site_portraits(breeds_json: dict[str, Any]) -> list[dict[str, Any]]:
    """Portrait entries of the raw breed data (one per breed file and episode)"""
    return [
        {
            "breedId": breed["id"],
            "breed": breed["details"]["public"][0],
            "number": entry["number"],
            "episode": entry["episode"],
            "timecode": entry["meta"]["timecode"],
        }
        for breed in breeds_json["breeds"]
        for entry in breed["podcast"]
        if entry["meta"]["internal"] == "portrait"
    ]


def load_site_portraits() -> list[dict[str, Any]]:
    return site_portraits(json.loads((REPO / "public/data/breeds.json").read_text()))


def replace_timecode(source: str, episode: str, old: int, new: int) -> str:
    """Change the timecode of the podcast entry for `episode` in a breed file"""
    start = source.find(f"episode: {json.dumps(episode, ensure_ascii=False)}")
    if start < 0:
        raise ValueError(f"episode not found: {episode}")
    match = re.compile(r"timecode:\s*(\d+)").search(source, start)
    if not match or int(match[1]) != old:
        raise ValueError(f"timecode for {episode} is not {old}")
    return source[: match.start(1)] + str(new) + source[match.end(1) :]


def breed_file(breed_id: int | str):
    return REPO / "db/breeds" / str(breed_id) / "index.ts"
