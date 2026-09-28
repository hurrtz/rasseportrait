"""Consolidate the per-episode topics into the topic index."""

from __future__ import annotations

import copy
import json
from collections import defaultdict
from typing import Any

from .extraction import CATEGORIES, KNOWN_TOPICS, MODEL
from .index import merge_segments

Extractions = dict[str, dict[str, Any]]


def is_portrait_topic(segment: dict[str, Any], breed_names: set[str]) -> bool:
    """Breed portraits have their own section on the site, so they are no topic"""
    text = f"{segment['topic']} {segment['label']}".lower()
    return "rasseport" in text or segment["label"].strip() in breed_names


def drop_portrait_topics(extractions: Extractions, breed_names: set[str]) -> Extractions:
    """Remove portrait sections and topics that are just a breed name"""
    kept = copy.deepcopy(extractions)
    for data in kept.values():
        data["segments"] = [s for s in data["segments"] if not is_portrait_topic(s, breed_names)]
    return kept


def inventory(extractions: Extractions) -> list[dict[str, Any]]:
    """Every topic id the extraction produced, with how often it occurs"""
    items: dict[str, dict[str, Any]] = {}
    for episode_id, data in extractions.items():
        for segment in data["segments"]:
            item = items.setdefault(
                segment["topic"],
                {
                    "id": segment["topic"],
                    "label": segment["label"],
                    "category": segment["category"],
                    "episodes": set(),
                    "sections": 0,
                    "examples": [],
                },
            )
            item["episodes"].add(episode_id)
            item["sections"] += 1
            if len(item["examples"]) < 2:
                item["examples"].append(segment["summary"])
    result = [{**item, "episodes": len(item["episodes"])} for item in items.values()]
    return sorted(result, key=lambda item: (-item["episodes"], item["id"]))


def apply_mapping(
    extractions: Extractions,
    topics: list[dict[str, Any]],
    dropped: set[str] | frozenset[str] = frozenset(),
) -> Extractions:
    """Rename merged topic ids to their canonical topic and remove dropped ids.

    Unmapped ids stay as they are. Each section keeps what it is about as
    `segmentLabel` before the canonical label replaces its own.
    """
    canonical = {}
    for topic in topics:
        for merged_id in topic["merged_ids"]:
            canonical[merged_id] = topic
    mapped = copy.deepcopy(extractions)
    for data in mapped.values():
        data["segments"] = [s for s in data["segments"] if s["topic"] not in dropped]
        for segment in data["segments"]:
            segment["segmentLabel"] = segment["label"]
            topic = canonical.get(segment["topic"])
            if topic:
                segment.update(topic=topic["id"], label=topic["label"], category=topic["category"])
    return mapped


def fix_known_labels(topics: list[dict[str, Any]]) -> list[dict[str, Any]]:
    """The seven original Hundewissen topics keep their names"""
    return [
        {**topic, "label": KNOWN_TOPICS[topic["id"]]} if topic["id"] in KNOWN_TOPICS else topic
        for topic in topics
    ]


def episode_records(episodes: list[Any], extractions: Extractions) -> dict[str, dict[str, Any]]:
    """Per indexed episode what the site needs besides the topics"""
    return {
        e.id: {
            "feed": e.feed,
            "number": e.number,
            "title": e.title,
            "published": e.published,
            "duration": e.duration,
            "audioUrl": e.url,
            "breeds": extractions[e.id]["breeds"],
            "portrait": extractions[e.id]["portrait"],
        }
        for e in episodes
        if e.id in extractions
    }


def topic_table(
    extractions: Extractions,
    topics: list[dict[str, Any]],
    episodes: dict[str, dict[str, Any]],
) -> list[dict[str, Any]]:
    """Per topic: its episodes with timecodes, back-to-back sections merged"""
    described = {t["id"]: t for t in topics}
    table: dict[str, dict[str, Any]] = {}
    for episode_id in episodes:
        data = extractions.get(episode_id)
        if not data:
            continue
        for segment in merge_segments(data["segments"]):
            topic = table.setdefault(
                segment["topic"],
                {
                    "id": segment["topic"],
                    "label": segment["label"],
                    "category": segment["category"],
                    "description": described.get(segment["topic"], {}).get("description", ""),
                    "entries": [],
                },
            )
            topic["entries"].append(
                {
                    "label": segment.get("segmentLabel", segment["label"]),
                    "episode": episode_id,
                    "number": episodes[episode_id]["number"],
                    "title": episodes[episode_id]["title"],
                    "start": segment["start"],
                    "end": segment["end"],
                    "weight": segment["weight"],
                    "kind": segment["kind"],
                    "summaries": segment["summaries"],
                }
            )
    for topic in table.values():
        topic["episodeCount"] = len({e["episode"] for e in topic["entries"]})
    return sorted(table.values(), key=lambda t: (-t["episodeCount"], t["label"]))


CONSOLIDATION_SYSTEM = f"""Du bekommst die vollständige Liste der Themen-ids, die beim Indexieren aller Folgen des Podcasts „Tierisch Menschlich“ entstanden sind, jeweils mit Label, Kategorie, Anzahl der Folgen und Beispielen. Die ids wurden pro Folge unabhängig vergeben, deshalb gibt es Dubletten für dasselbe Thema.

Deine Aufgabe: Führe nur echte Dubletten zusammen, also ids, die dasselbe Thema bezeichnen (Synonyme, Schreibvarianten, Singular/Plural, dasselbe Thema mit anderem Wortlaut). Verschiedene Themen bleiben getrennt, auch wenn sie verwandt sind – die Liste soll vollständig und fein bleiben; zusammenfassen kann man später. Beispiele: „rueckruf“ und „rueckrufsignal“ zusammen; „leinenfuehrigkeit“ und „rueckruf“ getrennt; „zecken“ und „zeckenschutz“ zusammen; „zecken“ und „floehe“ getrennt.

Diese ids bleiben als kanonische ids mit genau diesen Labels erhalten, wenn sie vorkommen: {json.dumps(KNOWN_TOPICS, ensure_ascii=False)}.

Labels sind wiederverwendbare Themennamen, keine Folgenbeschreibungen: „Einschläfern“ statt „Almas Krankheitsverlauf und Einschläferung“, „Stolz bei Hunden“ statt „Dürfen Hunde stolz sein?“.

Rasseportraits haben auf der Website einen eigenen Bereich. Ids, die nur eine einzelne Rasse beschreiben (Wesen, Haltung, typische Krankheiten einer bestimmten Rasse), gehören nicht in den Index: Ordne sie einem allgemeinen Thema zu, wenn es passt (etwa „Typische Erkrankungen der Deutschen Dogge“ → Gelenkprobleme bei Riesenrassen), sonst trage sie in dropped_ids ein.

Für jedes Thema: kanonische id (eine der vorhandenen ids, bevorzugt die häufigste), ein gutes deutsches Label, die passendste Kategorie, eine Beschreibung in einem Satz, und merged_ids = alle ids, die darin aufgehen (inklusive der kanonischen). Jede Eingabe-id muss genau einmal vorkommen: entweder in merged_ids eines Themas oder in dropped_ids."""

CONSOLIDATION_SCHEMA = {
    "type": "object",
    "properties": {
        "topics": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "id": {"type": "string"},
                    "label": {"type": "string"},
                    "category": {"type": "string", "enum": CATEGORIES},
                    "description": {"type": "string"},
                    "merged_ids": {"type": "array", "items": {"type": "string"}},
                },
                "required": ["id", "label", "category", "description", "merged_ids"],
                "additionalProperties": False,
            },
        },
        "dropped_ids": {"type": "array", "items": {"type": "string"}},
    },
    "required": ["topics", "dropped_ids"],
    "additionalProperties": False,
}


def consolidate(client: Any, items: list[dict[str, Any]]) -> tuple[list[dict[str, Any]], list[str]]:
    """Merge duplicate topic ids with one Claude call; every id is merged or dropped"""
    lines = [
        f"{i['id']} | {i['label']} | {i['category']} | {i['episodes']} Folgen | "
        + " / ".join(i["examples"])
        for i in items
    ]
    with client.messages.stream(
        model=MODEL,
        max_tokens=128000,
        system=CONSOLIDATION_SYSTEM,
        thinking={"type": "adaptive"},
        output_config={
            "effort": "high",
            "format": {"type": "json_schema", "schema": CONSOLIDATION_SCHEMA},
        },
        messages=[{"role": "user", "content": "id | Label | Kategorie | Folgen | Beispiele\n" + "\n".join(lines)}],
    ) as stream:
        message = stream.get_final_message()
    if message.stop_reason in ("refusal", "max_tokens"):
        raise RuntimeError(f"consolidation stopped: {message.stop_reason}")
    result = json.loads(next(b.text for b in message.content if b.type == "text"))
    topics = result["topics"]
    by_id = {i["id"]: i for i in items}
    dropped = [i for i in result["dropped_ids"] if i in by_id]

    # every input id exactly once: drop repeats, add what the model left out
    seen: set[str] = set(dropped)
    for topic in topics:
        topic["merged_ids"] = [i for i in topic["merged_ids"] if i not in seen and not seen.add(i)]
    for missing in (set(by_id) - seen):
        item = by_id[missing]
        topics.append({"id": missing, "label": item["label"], "category": item["category"],
                       "description": "", "merged_ids": [missing]})
    return fix_known_labels([t for t in topics if t["merged_ids"]]), dropped


def category_summary(table: list[dict[str, Any]]) -> dict[str, dict[str, int]]:
    summary: dict[str, dict[str, int]] = defaultdict(lambda: {"topics": 0})
    for topic in table:
        summary[topic["category"]]["topics"] += 1
    return dict(summary)
