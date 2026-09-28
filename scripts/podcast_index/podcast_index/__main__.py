"""Podcast topic index pipeline.

    uv run python -m podcast_index feeds         # refresh the episode list
    uv run python -m podcast_index transcribe    # download + transcribe (audio deleted after)
    uv run python -m podcast_index submit        # send new transcripts to a batch
    uv run python -m podcast_index collect       # save finished batch results
    uv run python -m podcast_index status
    uv run python -m podcast_index build         # consolidate topics, write the index
    uv run python -m podcast_index portraits [--apply]
    uv run python -m podcast_index live          # rewrite .podcast/topics-live.md
    uv run python -m podcast_index watch         # collect + submit + live, every 10 min
"""

from __future__ import annotations

import argparse
import json
import time
from concurrent.futures import ThreadPoolExecutor
from datetime import date, datetime

from . import build, extract, feeds, live, portraits, report, transcripts
from .common import REPO, WORK, client
from .index import match_site_entry, portrait_correction
from .transcripts import timecode


def select(only: str | None) -> list[feeds.Episode]:
    episodes = feeds.load()
    if only:
        wanted = set(only.split(","))
        episodes = [e for e in episodes if e.id in wanted]
    return episodes


def cmd_feeds(_args) -> None:
    episodes = feeds.refresh()
    by_feed: dict[str, int] = {}
    for e in episodes:
        by_feed[e.feed] = by_feed.get(e.feed, 0) + 1
    hours = sum(e.duration for e in episodes) / 3600
    print(f"{len(episodes)} episodes {by_feed}, {hours:.0f} h audio")


def cmd_transcribe(args) -> None:
    todo = [e for e in select(args.only) if not transcripts.transcript_path(e).exists()]
    print(f"{len(todo)} episodes to transcribe", flush=True)
    with ThreadPoolExecutor(max_workers=2) as pool:
        downloads = {}
        for index, episode in enumerate(todo):
            # keep the next few downloads running while transcribing
            for upcoming in todo[index : index + args.ahead]:
                if upcoming.id not in downloads:
                    downloads[upcoming.id] = pool.submit(transcripts.download, upcoming)
            started = time.time()
            downloads.pop(episode.id).result()
            transcripts.transcribe(episode)
            print(
                f"[{index + 1}/{len(todo)}] {episode.id} ({episode.duration // 60} min) "
                f"in {time.time() - started:.0f}s",
                flush=True,
            )


def cmd_submit(args) -> None:
    episodes = select(args.only)
    todo = extract.pending(episodes, extract.in_flight_ids())[: args.limit]
    batch_id = extract.submit(todo)
    print(f"submitted {len(todo)} episodes" + (f" as {batch_id}" if batch_id else ""))


def cmd_collect(_args) -> None:
    report = extract.collect()
    print(
        f"saved {report['saved']}, running {report['running']}, "
        f"failed {len(report['failed'])} {report['failed'] or ''}, "
        f"tokens {report['usage'][0]} in / {report['usage'][1]} out"
    )


def cmd_status(_args) -> None:
    episodes = feeds.load()
    transcribed = sum(transcripts.transcript_path(e).exists() for e in episodes)
    extracted = sum(extract.extraction_path(e).exists() for e in episodes)
    print(f"{len(episodes)} episodes · {transcribed} transcribed · {extracted} extracted")


def load_extractions(episodes: list[feeds.Episode]) -> dict:
    return {
        e.id: json.loads(extract.extraction_path(e).read_text())
        for e in episodes
        if extract.extraction_path(e).exists()
    }


def breed_names() -> set[str]:
    return {
        name
        for breed in json.loads((REPO / "public/data/breeds.json").read_text())["breeds"]
        for name in breed["details"]["public"]
    }


LIVE_FILE = WORK / "topics-live.md"


def write_live(episodes: list[feeds.Episode]) -> None:
    transcribed = sum(transcripts.transcript_path(e).exists() for e in episodes)
    LIVE_FILE.write_text(
        live.render_live(
            load_extractions(episodes),
            transcribed=transcribed,
            total=len(episodes),
            breed_names=breed_names(),
            now=datetime.now().strftime("%d.%m. %H:%M"),
        )
    )


def cmd_live(_args) -> None:
    write_live(feeds.load())
    print(LIVE_FILE)


def cmd_watch(args) -> None:
    """Until every episode is extracted: collect, submit new transcripts, refresh the live list"""
    while True:
        episodes = feeds.load()
        result = extract.collect()
        write_live(episodes)
        todo = extract.pending(episodes, extract.in_flight_ids())
        batch_id = extract.submit(todo)
        done = sum(extract.extraction_path(e).exists() for e in episodes)
        stamp = datetime.now().strftime("%H:%M")
        print(
            f"{stamp} saved {result['saved']} · failed {len(result['failed'])} · running {result['running']} · "
            f"submitted {len(todo) if batch_id else 0} · extracted {done}/{len(episodes)}",
            flush=True,
        )
        transcribing = any(not transcripts.transcript_path(e).exists() for e in episodes)
        if not transcribing and not todo and not result["running"] and not batch_id:
            break
        time.sleep(args.interval)


def cmd_build(args) -> None:
    episodes = feeds.load()
    extractions = build.drop_portrait_topics(load_extractions(episodes), breed_names())
    items = build.inventory(extractions)
    cache = WORK / "consolidation.json"
    if args.reuse and cache.exists():
        cached = json.loads(cache.read_text())
        topics, dropped = cached["topics"], cached["dropped"]
    else:
        print(f"consolidating {len(items)} topic ids …", flush=True)
        topics, dropped = build.consolidate(client(), items)
        cache.write_text(
            json.dumps({"topics": topics, "dropped": dropped}, ensure_ascii=False, indent=1)
        )
    records = build.episode_records(episodes, extractions)
    mapped = build.apply_mapping(extractions, topics, set(dropped))
    table = build.topic_table(mapped, topics, records)

    out = REPO / "db/podcast"
    out.mkdir(parents=True, exist_ok=True)
    (out / "topic-index.json").write_text(
        json.dumps(
            {
                "generated": date.today().isoformat(),
                "indexedEpisodes": len(extractions),
                "totalEpisodes": len(episodes),
                "episodes": records,
                "topics": table,
            },
            ensure_ascii=False,
            indent=1,
        )
    )
    (REPO / "docs/podcast-topics.md").write_text(report.render(table, len(extractions), len(episodes)))
    print(
        f"{len(items)} topic ids → {len(table)} topics ({len(dropped)} breed-only ids dropped) "
        f"from {len(extractions)} episodes"
    )


def cmd_portraits(args) -> None:
    site = portraits.load_site_portraits()
    episodes = feeds.load()
    extractions = load_extractions(episodes)
    changes = []
    for episode in episodes:
        data = extractions.get(episode.id)
        if not data or not data["portrait"]["present"]:
            continue
        entry = match_site_entry(episode.title, episode.number, site)
        if not entry:
            print(f"  no breed data for {episode.id} ({data['portrait']['breed']})")
            continue
        change = portrait_correction(entry, data["portrait"]["start"])
        if change:
            changes.append((entry, change))
            print(
                f"  {episode.id} {change['breed']}: {timecode(change['from'])} → {timecode(change['to'])}"
            )
    if args.apply:
        for entry, change in changes:
            path = portraits.breed_file(entry["breedId"])
            path.write_text(
                portraits.replace_timecode(path.read_text(), entry["episode"], change["from"], change["to"])
            )
    print(f"{len(changes)} portrait timecodes {'updated' if args.apply else 'to update (use --apply)'}")


def main() -> None:
    parser = argparse.ArgumentParser(prog="podcast_index")
    sub = parser.add_subparsers(required=True)
    sub.add_parser("feeds").set_defaults(run=cmd_feeds)
    p = sub.add_parser("transcribe")
    p.add_argument("--only", help="comma-separated episode ids")
    p.add_argument("--ahead", type=int, default=6, help="downloads to keep ahead")
    p.set_defaults(run=cmd_transcribe)
    p = sub.add_parser("submit")
    p.add_argument("--only", help="comma-separated episode ids")
    p.add_argument("--limit", type=int, default=1000)
    p.set_defaults(run=cmd_submit)
    sub.add_parser("collect").set_defaults(run=cmd_collect)
    sub.add_parser("status").set_defaults(run=cmd_status)
    p = sub.add_parser("build")
    p.add_argument("--reuse", action="store_true", help="reuse the last consolidation")
    p.set_defaults(run=cmd_build)
    sub.add_parser("live").set_defaults(run=cmd_live)
    p = sub.add_parser("watch")
    p.add_argument("--interval", type=int, default=600, help="seconds between rounds")
    p.set_defaults(run=cmd_watch)
    p = sub.add_parser("portraits")
    p.add_argument("--apply", action="store_true", help="write the fixes into db/breeds")
    p.set_defaults(run=cmd_portraits)
    args = parser.parse_args()
    args.run(args)


if __name__ == "__main__":
    main()
