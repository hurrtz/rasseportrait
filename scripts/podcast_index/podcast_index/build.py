"""Consolidate the per-episode topics into the topic index."""

from __future__ import annotations

import copy
import json
import re
from collections import defaultdict
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path
from typing import Any

from .extraction import CATEGORIES, KNOWN_TOPICS, MODEL
from .index import merge_segments

Extractions = dict[str, dict[str, Any]]


def is_portrait_topic(segment: dict[str, Any], breed_names: set[str]) -> bool:
    """Breed portraits have their own section on the site, so they are no topic"""
    text = f"{segment['topic']} {segment['label']}".lower()
    return "rasseport" in text or segment["label"].strip() in breed_names


def drop_portrait_topics(extractions: Extractions, breed_names: set[str]) -> Extractions:
    """Remove portrait sections, topics that are just a breed name, and
    placeholder sections the extraction left without a topic"""
    kept = copy.deepcopy(extractions)
    for data in kept.values():
        data["segments"] = [
            s
            for s in data["segments"]
            if s["topic"].strip() and not is_portrait_topic(s, breed_names)
        ]
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


CROSS_SYSTEM = f"""Du bekommst die Themen des Podcasts „Tierisch Menschlich“. Innerhalb jeder Kategorie wurden Dubletten bereits zusammengeführt; jedes Thema steht mit id, Label, Kategorie, Anzahl der Folgen und Beschreibung da.

Deine Aufgabe: Führe nur noch Themen zusammen, die über Kategorien hinweg dasselbe Thema bezeichnen (etwa „zecken“ unter Gesundheit & Medizin und „zeckenschutz“ unter Haltung & Pflege). Verschiedene Themen bleiben getrennt, auch wenn sie verwandt sind.

Diese ids bleiben als kanonische ids mit genau diesen Labels erhalten, wenn sie vorkommen: {json.dumps(KNOWN_TOPICS, ensure_ascii=False)}.

Gib nur die Zusammenführungen aus: Themen mit mindestens zwei merged_ids, jeweils mit kanonischer id (eine der vorhandenen ids, bevorzugt die mit den meisten Folgen), Label, der passendsten Kategorie und einer Beschreibung in einem Satz. Themen, die nur eine einzelne Rasse beschreiben, gehören in dropped_ids. Alle übrigen Themen bleiben unverändert und werden nicht aufgeführt. Keine id darf mehrfach vorkommen."""


def area_slug(category: str) -> str:
    """"Erziehung & Training" → "erziehung-training" (the site's area slugs)"""
    text = category.lower()
    for umlaut, plain in (("ä", "ae"), ("ö", "oe"), ("ü", "ue"), ("ß", "ss")):
        text = text.replace(umlaut, plain)
    return re.sub(r"[^a-z0-9]+", "-", text).strip("-")


def merge_prompt(items: list[dict[str, Any]]) -> str:
    """The user message of a merge call: one line per topic id"""
    lines = [
        f"{i['id']} | {i['label']} | {i['category']} | {i['episodes']} Folgen | "
        + " / ".join(i["examples"])
        for i in items
    ]
    return "id | Label | Kategorie | Folgen | Beispiele\n" + "\n".join(lines)


def _ask(client: Any, items: list[dict[str, Any]], system: str) -> dict[str, Any]:
    """One Claude call over `items`; the raw {topics, dropped_ids} answer"""
    with client.messages.stream(
        model=MODEL,
        max_tokens=128000,
        system=system,
        thinking={"type": "adaptive"},
        output_config={
            "effort": "high",
            "format": {"type": "json_schema", "schema": CONSOLIDATION_SCHEMA},
        },
        messages=[{"role": "user", "content": merge_prompt(items)}],
    ) as stream:
        message = stream.get_final_message()
    if message.stop_reason in ("refusal", "max_tokens"):
        raise RuntimeError(f"consolidation stopped: {message.stop_reason}")
    return json.loads(next(b.text for b in message.content if b.type == "text"))


def _normalize(
    result: dict[str, Any], items: list[dict[str, Any]]
) -> tuple[list[dict[str, Any]], list[str]]:
    """Every input id exactly once: drop repeats and unknown ids, add what was left out"""
    topics = copy.deepcopy(result["topics"])
    by_id = {i["id"]: i for i in items}
    dropped = [i for i in result["dropped_ids"] if i in by_id]
    seen: set[str] = set(dropped)
    for topic in topics:
        topic["merged_ids"] = [
            i for i in topic["merged_ids"] if i in by_id and i not in seen and not seen.add(i)
        ]
    for missing in sorted(set(by_id) - seen):
        item = by_id[missing]
        topics.append({"id": missing, "label": item["label"], "category": item["category"],
                       "description": "", "merged_ids": [missing]})
    topics = [t for t in topics if t["merged_ids"]]
    # canonical ids come from the extraction (URL-safe); the most frequent one wins
    for topic in topics:
        if topic["id"] not in topic["merged_ids"]:
            topic["id"] = max(topic["merged_ids"], key=lambda i: by_id[i]["episodes"])
    return topics, dropped


def _merge(
    client: Any, items: list[dict[str, Any]], system: str, cache: Path | None
) -> tuple[list[dict[str, Any]], list[str]]:
    """A saved answer when there is one, else a call whose answer is saved"""
    if cache and cache.exists():
        result = json.loads(cache.read_text())
    else:
        result = _ask(client, items, system)
        if cache:
            cache.parent.mkdir(parents=True, exist_ok=True)
            cache.write_text(json.dumps(result, ensure_ascii=False, indent=1))
    return _normalize(result, items)


def consolidate(
    client: Any, items: list[dict[str, Any]], cache_dir: Path | None = None
) -> tuple[list[dict[str, Any]], list[str]]:
    """Merge duplicate topic ids: within each category, then across categories.

    Two passes keep each call small enough to list every id it covers. With
    `cache_dir`, each answer is saved as <area slug>.json / _across.json and
    reused, so an interrupted run resumes where it stopped.
    """
    by_category: dict[str, list[dict[str, Any]]] = defaultdict(list)
    for item in items:
        by_category[item["category"]].append(item)

    def cache(name: str) -> Path | None:
        return cache_dir / f"{name}.json" if cache_dir else None

    with ThreadPoolExecutor(max_workers=4) as pool:
        results = list(
            pool.map(
                lambda entry: _merge(client, entry[1], CONSOLIDATION_SYSTEM, cache(area_slug(entry[0]))),
                by_category.items(),
            )
        )
    first = {t["id"]: t for topics, _ in results for t in topics}
    dropped = [i for _, ids in results for i in ids]

    topics, dropped_across = _merge(client, cross_items(first, items), CROSS_SYSTEM, cache("_across"))

    merged = [
        {
            **topic,
            "description": topic["description"] or first[topic["id"]]["description"],
            "merged_ids": [i for canonical in topic["merged_ids"] for i in first[canonical]["merged_ids"]],
        }
        for topic in topics
    ]
    dropped += [i for canonical in dropped_across for i in first[canonical]["merged_ids"]]
    return fix_known_labels(merged), dropped


def cross_items(
    first: dict[str, dict[str, Any]], items: list[dict[str, Any]]
) -> list[dict[str, Any]]:
    """The first pass's topics as input for the pass across categories"""
    counts = {i["id"]: i["episodes"] for i in items}
    return [
        {
            "id": t["id"],
            "label": t["label"],
            "category": t["category"],
            "episodes": sum(counts.get(i, 0) for i in t["merged_ids"]),
            "examples": [t["description"]],
        }
        for t in first.values()
    ]


def category_summary(table: list[dict[str, Any]]) -> dict[str, dict[str, int]]:
    summary: dict[str, dict[str, int]] = defaultdict(lambda: {"topics": 0})
    for topic in table:
        summary[topic["category"]]["topics"] += 1
    return dict(summary)
