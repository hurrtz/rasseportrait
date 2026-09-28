from podcast_index.feeds import parse_duration, parse_feed, parse_title


def test_numbered_rtl_episode():
    assert parse_title("rtl", "231 - Ragebait, Qualzucht & Elch Erwin") == (
        "rtl-231",
        231,
        "Ragebait, Qualzucht & Elch Erwin",
    )


def test_both_summer_edition_series_get_distinct_ids_and_site_numbers():
    assert parse_title("rtl", "#4 Summer Edition: Otterjagd & Dackelkatzen") == (
        "rtl-summer-a04",
        "Summer Edition #4",
        "Otterjagd & Dackelkatzen",
    )
    assert parse_title("rtl", "Summer Edition #4: Körper kräftig, aber nicht ohne Adel!") == (
        "rtl-summer-b04",
        "Summer Edition #4",
        "Körper kräftig, aber nicht ohne Adel!",
    )


def test_mina_episode():
    assert parse_title("mina", "016: Das Letzte vor dem Sommer") == (
        "mina-016",
        16,
        "Das Letzte vor dem Sommer",
    )


def test_trailers_and_notices_are_skipped():
    assert parse_title("rtl", "Keine neue Folge!?") is None
    assert parse_title("mina", "Tierisch Menschlich - Trailer") is None


def test_durations():
    assert parse_duration("1:04:42") == 3882
    assert parse_duration("64:42") == 3882
    assert parse_duration("3882") == 3882
    assert parse_duration(None) == 0


def test_parse_feed_reads_items_with_enclosures():
    xml = """<rss xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd"><channel>
      <item><title>65 - Ein Keks mit Folgen</title><enclosure url="https://x/65.mp3" type="audio/mpeg"/><itunes:duration>01:32:52</itunes:duration><pubDate>Thu, 02 Jun 2022 00:00:00 +0200</pubDate></item>
      <item><title>Einblicke in "Tierisch menschlich"</title><enclosure url="https://x/t.mp3"/></item>
    </channel></rss>"""
    [episode] = parse_feed("rtl", xml)
    assert (episode.id, episode.number, episode.url, episode.duration) == ("rtl-065", 65, "https://x/65.mp3", 5572)


def test_parse_feed_keeps_the_publication_date_as_written():
    xml = """<rss xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd"><channel>
      <item><title>240 - Weniger Tierschutz</title><enclosure url="https://x/240.mp3"/><pubDate>Thu, 01 Jan 2026 00:00:00 +0100</pubDate></item>
    </channel></rss>"""
    [episode] = parse_feed("rtl", xml)
    assert episode.published == "2026-01-01"


def test_episodes_saved_before_the_date_existed_still_load():
    from podcast_index.feeds import Episode

    episode = Episode(id="rtl-001", feed="rtl", number=1, title="t", url="u", duration=1)
    assert episode.published == ""
