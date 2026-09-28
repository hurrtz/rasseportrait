"""Episode list from the two public RSS feeds."""

from __future__ import annotations

import json
import re
import urllib.request
import xml.etree.ElementTree as ET
from dataclasses import asdict, dataclass
from email.utils import parsedate_to_datetime

from .common import EPISODES_FILE, WORK

FEEDS = {
    # RTL+ era, up to December 2025
    "rtl": "https://cdn.audiorella.com/podcasts/1744-tierisch-menschlich-der-podcast-mit-hundeprofi-martin-rutter-und-katharina-adick/feed.rss",
    # Mina Entertainment / Spotify era, since February 2026
    "mina": "https://cdn.audiorella.com/podcasts/1781-tierisch-menschlich/feed.rss",
}

ITUNES = {"itunes": "http://www.itunes.com/dtds/podcast-1.0.dtd"}


@dataclass
class Episode:
    id: str  # stable file-safe id, e.g. "rtl-231", "rtl-summer-b04", "mina-016"
    feed: str
    number: int | str  # as the breed data writes it: 231, "Summer Edition #4"
    title: str  # episode title without the number prefix
    url: str
    duration: int  # seconds
    published: str = ""  # ISO date as the feed writes it (local date)


def parse_duration(value: str | None) -> int:
    """"1:04:42" / "64:42" / "3882" → seconds"""
    if not value:
        return 0
    seconds = 0
    for part in value.strip().split(":"):
        seconds = seconds * 60 + int(part)
    return seconds


def parse_published(value: str | None) -> str:
    """RSS pubDate → ISO date, keeping the feed's own (local) calendar date"""
    return parsedate_to_datetime(value).date().isoformat() if value else ""


def parse_title(feed: str, raw: str) -> tuple[str, int | str, str] | None:
    """(id, number, title) for an episode title; None for trailers and notices.

    The RTL feed has two Summer Edition series with the same numbers:
    "#4 Summer Edition: …" (first summer, id suffix a) and
    "Summer Edition #4: …" (second summer, suffix b).
    """
    raw = raw.strip()
    if feed == "mina":
        match = re.match(r"^(\d{3}):\s*(.+)$", raw)
        return (f"mina-{match[1]}", int(match[1]), match[2]) if match else None
    if match := re.match(r"^(\d+)\s*-\s*(.+)$", raw):
        return (f"rtl-{int(match[1]):03d}", int(match[1]), match[2])
    if match := re.match(r"^#(\d+) Summer Edition:\s*(.+)$", raw):
        return (f"rtl-summer-a{int(match[1]):02d}", f"Summer Edition #{match[1]}", match[2])
    if match := re.match(r"^Summer Edition #(\d+):\s*(.+)$", raw):
        return (f"rtl-summer-b{int(match[1]):02d}", f"Summer Edition #{match[1]}", match[2])
    return None


def parse_feed(feed: str, xml_text: str) -> list[Episode]:
    episodes = []
    for item in ET.fromstring(xml_text).findall("./channel/item"):
        parsed = parse_title(feed, item.findtext("title") or "")
        enclosure = item.find("enclosure")
        if not parsed or enclosure is None:
            continue
        episode_id, number, title = parsed
        episodes.append(
            Episode(
                id=episode_id,
                feed=feed,
                number=number,
                title=title,
                url=enclosure.get("url", ""),
                duration=parse_duration(item.findtext("itunes:duration", namespaces=ITUNES)),
                published=parse_published(item.findtext("pubDate")),
            )
        )
    return episodes


def refresh() -> list[Episode]:
    """Fetch both feeds and write .podcast/episodes.json"""
    episodes: list[Episode] = []
    for feed, url in FEEDS.items():
        with urllib.request.urlopen(url, timeout=60) as response:
            episodes += parse_feed(feed, response.read().decode("utf-8"))
    WORK.mkdir(parents=True, exist_ok=True)
    EPISODES_FILE.write_text(
        json.dumps([asdict(e) for e in episodes], ensure_ascii=False, indent=1)
    )
    return episodes


def load() -> list[Episode]:
    return [Episode(**e) for e in json.loads(EPISODES_FILE.read_text())]
