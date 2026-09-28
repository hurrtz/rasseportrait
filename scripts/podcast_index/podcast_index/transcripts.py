"""Download and transcribe episodes; transcripts are compact timestamped text."""

from __future__ import annotations

import urllib.request
from typing import Any

from .common import AUDIO, TRANSCRIPTS
from .feeds import Episode

WHISPER_MODEL = "mlx-community/whisper-large-v3-turbo"
# Names and terms Whisper should spell right
WHISPER_PROMPT = (
    "Tierisch Menschlich, Podcast mit Hundeprofi Martin Rütter und Katharina Adick. "
    "Rasseportrait, Hunderasse, FCI, Qualzucht, Tierarzt."
)


def timecode(total_seconds: float) -> str:
    """3728 → "1:02:08" """
    s = int(total_seconds)
    return f"{s // 3600}:{s % 3600 // 60:02d}:{s % 60:02d}"


def seconds(code: str) -> int:
    """"1:02:08" / "44:50" → seconds"""
    total = 0
    for part in code.strip().split(":"):
        total = total * 60 + int(part)
    return total


def compact(segments: list[dict[str, Any]], window: float = 10) -> str:
    """Whisper segments → one "[h:mm:ss] text" line per ≥ `window` seconds"""
    lines: list[str] = []
    start: float | None = None
    texts: list[str] = []
    for segment in segments:
        if start is None:
            start = segment["start"]
        texts.append(segment["text"].strip())
        if segment["end"] - start >= window:
            lines.append(f"[{timecode(start)}] {' '.join(texts)}")
            start, texts = None, []
    if texts and start is not None:
        lines.append(f"[{timecode(start)}] {' '.join(texts)}")
    return "\n".join(lines)


def audio_path(episode: Episode):
    return AUDIO / f"{episode.id}.mp3"


def transcript_path(episode: Episode):
    return TRANSCRIPTS / f"{episode.id}.txt"


def download(episode: Episode) -> None:
    """Fetch the MP3 unless it is already there (written atomically)"""
    target = audio_path(episode)
    if target.exists():
        return
    AUDIO.mkdir(parents=True, exist_ok=True)
    partial = target.with_suffix(".part")
    with urllib.request.urlopen(episode.url, timeout=600) as response, open(partial, "wb") as out:
        while chunk := response.read(1 << 20):
            out.write(chunk)
    partial.rename(target)


def transcribe(episode: Episode) -> None:
    """Transcribe the downloaded MP3, write the compact transcript, delete the audio"""
    import mlx_whisper  # heavy import, only needed here

    result = mlx_whisper.transcribe(
        str(audio_path(episode)),
        path_or_hf_repo=WHISPER_MODEL,
        language="de",
        initial_prompt=WHISPER_PROMPT,
        condition_on_previous_text=False,
        verbose=None,
    )
    TRANSCRIPTS.mkdir(parents=True, exist_ok=True)
    transcript_path(episode).write_text(compact(result["segments"]))
    audio_path(episode).unlink()
