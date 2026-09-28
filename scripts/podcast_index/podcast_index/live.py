"""Live topic list while the index is being built (.podcast/topics-live.md)."""

from __future__ import annotations

from collections import defaultdict
from typing import Any

from .build import drop_portrait_topics, inventory
from .extraction import CATEGORIES


def render_live(
    extractions: dict[str, dict[str, Any]],
    transcribed: int,
    total: int,
    breed_names: set[str],
    now: str,
) -> str:
    """Topics found so far, per category, with the number of episodes covering each.

    Raw ids from the extraction: near-duplicates are merged only in the final build.
    """
    items = inventory(drop_portrait_topics(extractions, breed_names))
    by_category: dict[str, list[dict[str, Any]]] = defaultdict(list)
    for item in items:
        by_category[item["category"]].append(item)

    lines = [
        "# Themen im Podcast – Zwischenstand",
        "",
        f"{len(extractions)} von {total} Folgen ausgewertet · {transcribed} transkribiert · Stand {now}",
        "",
        f"{len(items)} Themen bisher (in Klammern: Anzahl Folgen). Ähnliche Themen werden erst am Ende zusammengeführt.",
    ]
    for category in CATEGORIES:
        topics = sorted(by_category.get(category, []), key=lambda i: (-i["episodes"], i["label"]))
        if not topics:
            continue
        noun = "Thema" if len(topics) == 1 else "Themen"
        lines += ["", f"**{category}** ({len(topics)} {noun})"]
        lines += [f"- {t['label']} ({t['episodes']})" for t in topics]
    return "\n".join(lines) + "\n"
