"""Topic extraction through the Message Batches API (50% of standard price)."""

from __future__ import annotations

import json
from typing import Any

from anthropic.types.message_create_params import MessageCreateParamsNonStreaming
from anthropic.types.messages.batch_create_params import Request

from .common import EXTRACTIONS, WORK, client
from .extraction import build_params, parse_message
from .feeds import Episode
from .transcripts import transcript_path

BATCHES_FILE = WORK / "batches.json"
COLLECTED_FILE = WORK / "collected.json"
FAILURES_FILE = WORK / "failures.json"
MAX_ATTEMPTS = 3


def extraction_path(episode: Episode):
    return EXTRACTIONS / f"{episode.id}.json"


def _batches() -> list[str]:
    return json.loads(BATCHES_FILE.read_text()) if BATCHES_FILE.exists() else []


def failures() -> dict[str, int]:
    return json.loads(FAILURES_FILE.read_text()) if FAILURES_FILE.exists() else {}


def pending(episodes: list[Episode], in_flight: set[str]) -> list[Episode]:
    """Transcribed episodes without an extraction, not in a batch, not given up on"""
    failed = failures()
    return [
        e
        for e in episodes
        if transcript_path(e).exists()
        and not extraction_path(e).exists()
        and e.id not in in_flight
        and failed.get(e.id, 0) < MAX_ATTEMPTS
    ]


def in_flight_ids() -> set[str]:
    """Episode ids inside batches that have not ended yet"""
    c = client()
    ids: set[str] = set()
    for batch_id in _batches():
        batch = c.messages.batches.retrieve(batch_id)
        if batch.processing_status != "ended":
            ids |= set(json.loads((WORK / f"{batch_id}.ids.json").read_text()))
    return ids


def submit(episodes: list[Episode]) -> str | None:
    """One batch request per episode; returns the batch id"""
    if not episodes:
        return None
    requests = [
        Request(
            custom_id=e.id,
            params=MessageCreateParamsNonStreaming(
                **build_params(f"{e.number} – {e.title}", transcript_path(e).read_text())
            ),
        )
        for e in episodes
    ]
    batch = client().messages.batches.create(requests=requests)
    (WORK / f"{batch.id}.ids.json").write_text(json.dumps([e.id for e in episodes]))
    BATCHES_FILE.write_text(json.dumps(_batches() + [batch.id]))
    return batch.id


def collect() -> dict[str, Any]:
    """Save the results of ended batches; failures stay pending for resubmission"""
    c = client()
    EXTRACTIONS.mkdir(parents=True, exist_ok=True)
    report: dict[str, Any] = {"saved": 0, "failed": {}, "running": 0, "usage": [0, 0]}
    collected = set(json.loads(COLLECTED_FILE.read_text())) if COLLECTED_FILE.exists() else set()
    failed = failures()
    for batch_id in _batches():
        if batch_id in collected:
            continue
        batch = c.messages.batches.retrieve(batch_id)
        if batch.processing_status != "ended":
            report["running"] += batch.request_counts.processing
            continue
        for result in c.messages.batches.results(batch_id):
            target = EXTRACTIONS / f"{result.custom_id}.json"
            if target.exists():
                continue
            if result.result.type != "succeeded":
                report["failed"][result.custom_id] = result.result.type
                continue
            message = result.result.message
            try:
                data = parse_message(message)
            except (RuntimeError, ValueError) as error:
                report["failed"][result.custom_id] = str(error)
                continue
            target.write_text(json.dumps(data, ensure_ascii=False, indent=1))
            report["saved"] += 1
            report["usage"][0] += message.usage.input_tokens
            report["usage"][1] += message.usage.output_tokens
        collected.add(batch_id)
    for episode_id in report["failed"]:
        failed[episode_id] = failed.get(episode_id, 0) + 1
    COLLECTED_FILE.write_text(json.dumps(sorted(collected)))
    FAILURES_FILE.write_text(json.dumps(failed))
    return report
