"""Paths and credentials shared by the pipeline steps."""

from __future__ import annotations

import os
from pathlib import Path

import anthropic

REPO = Path(__file__).resolve().parents[3]
WORK = REPO / ".podcast"
AUDIO = WORK / "audio"
TRANSCRIPTS = WORK / "transcripts"
EXTRACTIONS = WORK / "extractions"
EPISODES_FILE = WORK / "episodes.json"


def client() -> anthropic.Anthropic:
    """Anthropic client; the key comes from ANTHROPIC_API_KEY or the repo's .env.

    The .env may store the key under another name, so any value that looks
    like an Anthropic key (sk-ant-…) is accepted.
    """
    key = os.environ.get("ANTHROPIC_API_KEY")
    env_file = REPO / ".env"
    if not key and env_file.exists():
        for line in env_file.read_text().splitlines():
            name, _, value = line.partition("=")
            value = value.strip().strip("\"'")
            if name.strip() == "ANTHROPIC_API_KEY" or value.startswith("sk-ant-"):
                key = value
                break
    if not key:
        raise SystemExit("No Anthropic API key in ANTHROPIC_API_KEY or .env")
    return anthropic.Anthropic(api_key=key)
