"""Human-readable overview of the topic index (docs/podcast-topics.md)."""

from __future__ import annotations

from collections import defaultdict
from typing import Any

from .extraction import CATEGORIES


def episode_name(number: int | str) -> str:
    return f"Folge {number}" if isinstance(number, int) else str(number)


def render(table: list[dict[str, Any]], indexed: int, total: int) -> str:
    by_category: dict[str, list[dict[str, Any]]] = defaultdict(list)
    for topic in table:
        by_category[topic["category"]].append(topic)

    lines = [
        "# Themen im Podcast „Tierisch Menschlich“",
        "",
        f"Automatisch erstellter Themenindex: {len(table)} Themen aus {indexed} von {total} Folgen. "
        "Zeitangaben gelten für Spotify und die Podcast-Feeds (identische Audiodateien). "
        "Erzeugt mit `scripts/podcast_index` (`python -m podcast_index build`).",
        "",
        "## Übersicht",
        "",
        "| Kategorie | Themen | Themen mit ≥ 3 Folgen |",
        "|---|---|---|",
    ]
    for category in CATEGORIES:
        topics = by_category.get(category, [])
        if topics:
            frequent = sum(t["episodeCount"] >= 3 for t in topics)
            lines.append(f"| {category} | {len(topics)} | {frequent} |")

    lines += ["", "## Alle Themen nach Anzahl der Folgen", "", "| Thema | Kategorie | Folgen |", "|---|---|---|"]
    for topic in table:
        lines.append(f"| [{topic['label']}](#{topic['id']}) | {topic['category']} | {topic['episodeCount']} |")

    lines += ["", "## Themen im Detail"]
    for category in CATEGORIES:
        topics = by_category.get(category, [])
        if not topics:
            continue
        lines += ["", f"### {category}"]
        for topic in topics:
            lines += [
                "",
                f'<a id="{topic["id"]}"></a>',
                f"#### {topic['label']} · {topic['episodeCount']} Folgen",
            ]
            if topic["description"]:
                lines.append(f"_{topic['description']}_")
            lines.append("")
            for entry in topic["entries"]:
                marker = "" if entry["weight"] == "main" else " (kurz)"
                lines.append(
                    f"- {episode_name(entry['number'])} „{entry['title']}“ ab {entry['start']}{marker}: "
                    + " ".join(entry["summaries"])
                )
    return "\n".join(lines) + "\n"
