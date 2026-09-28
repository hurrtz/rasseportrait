from podcast_index.index import merge_segments, match_site_entry, portrait_correction


def seg(start, end, topic, weight="main", summary="s"):
    return {"start": start, "end": end, "topic": topic, "label": topic.title(),
            "category": "Tierschutz & Ethik", "weight": weight, "kind": "discussion", "summary": summary}


def test_consecutive_sections_on_the_same_topic_are_merged():
    merged = merge_segments([
        seg("0:15:39", "0:20:03", "tierversuche", summary="Einführung."),
        seg("0:20:03", "0:24:26", "tierversuche", summary="Gesetz."),
        seg("0:24:26", "0:27:51", "lobbyismus"),
        seg("0:27:51", "0:35:24", "tierversuche", summary="Tötung."),
    ])

    assert [(s["topic"], s["start"], s["end"]) for s in merged] == [
        ("tierversuche", "0:15:39", "0:24:26"),
        ("lobbyismus", "0:24:26", "0:27:51"),
        ("tierversuche", "0:27:51", "0:35:24"),
    ]
    assert merged[0]["summaries"] == ["Einführung.", "Gesetz."]


def test_merge_sorts_by_start_and_keeps_main_weight():
    merged = merge_segments([
        seg("1:16:26", "1:16:58", "impfungen", weight="side"),
        seg("1:15:15", "1:16:26", "lebenshoefe", weight="side"),
        seg("1:17:00", "1:19:00", "impfungen", weight="main"),
    ])

    assert [s["topic"] for s in merged] == ["lebenshoefe", "impfungen"]
    assert merged[1]["weight"] == "main"
    assert merged[1]["end"] == "1:19:00"


def test_match_site_entry_by_title_not_number():
    site = [
        {"breed": "Border Collie", "number": "Summer Edition #4", "episode": "Otterjagd & Dackelkatzen", "timecode": 600},
        {"breed": "Pudel", "number": "Summer Edition #4", "episode": "Körper kräftig, aber nicht ohne Adel!", "timecode": 900},
    ]

    match = match_site_entry("Körper kräftig, aber nicht ohne Adel!", "Summer Edition #4", site)
    assert match["breed"] == "Pudel"


def test_match_site_entry_falls_back_to_the_episode_number():
    site = [{"breed": "Japan Chin", "number": 231, "episode": "Ragebait, Qualzucht und Elch Erwin", "timecode": 1845}]

    assert match_site_entry("Ragebait, Qualzucht & Elch Erwin", 231, site)["breed"] == "Japan Chin"
    assert match_site_entry("Etwas ganz anderes", 232, site) is None


def test_portrait_correction_only_for_clear_deviations():
    site = {"breed": "Japan Chin", "timecode": 1845}

    assert portrait_correction(site, "0:27:40") == {"breed": "Japan Chin", "from": 1845, "to": 1660}
    assert portrait_correction(site, "0:30:20") is None
