from podcast_index.transcripts import compact, timecode, seconds


def test_timecode_round_trip():
    assert timecode(3728) == "1:02:08"
    assert timecode(45.9) == "0:00:45"
    assert seconds("1:02:08") == 3728
    assert seconds("44:50") == 2690


def test_compact_groups_segments_into_windows_of_at_least_ten_seconds():
    segments = [
        {"start": 0.0, "end": 4.0, "text": " Herzlich willkommen"},
        {"start": 4.0, "end": 9.5, "text": " bei Tierisch Menschlich."},
        {"start": 9.5, "end": 12.0, "text": " Heute geht es um Zecken."},
        {"start": 12.0, "end": 30.0, "text": " Und um den Rückruf."},
        {"start": 31.0, "end": 33.0, "text": " Ende."},
    ]

    assert compact(segments) == (
        "[0:00:00] Herzlich willkommen bei Tierisch Menschlich. Heute geht es um Zecken.\n"
        "[0:00:12] Und um den Rückruf.\n"
        "[0:00:31] Ende."
    )
