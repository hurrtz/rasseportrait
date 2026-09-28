from podcast_index.live import render_live


def extraction(*topics):
    return {"segments": [
        {"start": "0:01:00", "end": "0:02:00", "topic": t, "label": label, "category": cat,
         "weight": "main", "kind": "discussion", "summary": "s"} for t, label, cat in topics
    ], "breeds": [], "portrait": {"present": False, "breed": "", "start": ""}}


def test_live_list_groups_topics_by_category_with_episode_counts():
    extractions = {
        "rtl-001": extraction(("zecken", "Zecken", "Gesundheit & Medizin"),
                              ("rueckruf", "Rückruf", "Erziehung & Training"),
                              ("zecken", "Zecken", "Gesundheit & Medizin")),
        "rtl-002": extraction(("zecken", "Zecken", "Gesundheit & Medizin"),
                              ("japan-chin", "Japan Chin", "Zucht & Rassen")),
    }

    text = render_live(extractions, transcribed=5, total=260, breed_names={"Japan Chin"}, now="17:55")

    assert "2 von 260 Folgen ausgewertet · 5 transkribiert · Stand 17:55" in text
    assert "**Gesundheit & Medizin** (1 Thema)\n- Zecken (2)" in text
    assert "**Erziehung & Training** (1 Thema)\n- Rückruf (1)" in text
    assert "Japan Chin" not in text


def test_live_list_sorts_by_episode_count_then_label():
    extractions = {
        "a": extraction(("b", "Beta", "Ernährung"), ("a", "Alpha", "Ernährung")),
        "b": extraction(("b", "Beta", "Ernährung")),
    }

    text = render_live(extractions, transcribed=2, total=2, breed_names=set(), now="x")

    assert "- Beta (2)\n- Alpha (1)" in text
