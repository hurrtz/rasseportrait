import json
from contextlib import nullcontext
from types import SimpleNamespace

from podcast_index import build
from podcast_index.build import apply_mapping, inventory, topic_table


def extraction(*segments):
    return {"segments": [
        {"start": s, "end": s, "topic": t, "label": t.title(), "category": "Gesundheit & Medizin",
         "weight": "main", "kind": "discussion", "summary": f"{t} in {s}"} for s, t in segments
    ], "breeds": [], "portrait": {"present": False, "breed": "", "start": ""}}


EXTRACTIONS = {
    "rtl-001": extraction(("0:01:00", "zecken"), ("0:05:00", "rueckruf")),
    "rtl-002": extraction(("0:02:00", "zecken"), ("0:03:00", "zecken"), ("0:09:00", "rueckrufsignal")),
}


def test_inventory_counts_episodes_and_sections_per_topic_id():
    inv = {item["id"]: item for item in inventory(EXTRACTIONS)}

    assert inv["zecken"]["episodes"] == 2
    assert inv["zecken"]["sections"] == 3
    assert inv["rueckrufsignal"]["episodes"] == 1
    assert inv["zecken"]["examples"][0] == "zecken in 0:01:00"


def test_apply_mapping_renames_topics_and_keeps_unmapped_ids():
    topics = [{"id": "rueckruf", "label": "Rückruf", "category": "Erziehung & Training",
               "description": "Hund zuverlässig zurückrufen", "merged_ids": ["rueckruf", "rueckrufsignal"]}]

    mapped = apply_mapping(EXTRACTIONS, topics)

    assert [s["topic"] for s in mapped["rtl-002"]["segments"]] == ["zecken", "zecken", "rueckruf"]
    assert mapped["rtl-001"]["segments"][0]["topic"] == "zecken"


def test_topic_table_counts_distinct_episodes_after_merging():
    topics = [{"id": "rueckruf", "label": "Rückruf", "category": "Erziehung & Training",
               "description": "", "merged_ids": ["rueckruf", "rueckrufsignal"]}]
    episodes = {"rtl-001": {"number": 1, "title": "Eins"}, "rtl-002": {"number": 2, "title": "Zwei"}}

    table = {t["id"]: t for t in topic_table(apply_mapping(EXTRACTIONS, topics), topics, episodes)}

    assert table["rueckruf"]["episodeCount"] == 2
    assert table["zecken"]["episodeCount"] == 2
    # the two back-to-back "zecken" sections in rtl-002 became one entry
    assert [(e["episode"], e["start"]) for e in table["zecken"]["entries"]] == [
        ("rtl-001", "0:01:00"), ("rtl-002", "0:02:00")]
    assert table["zecken"]["label"] == "Zecken"


def test_portraits_and_bare_breed_names_are_not_topics():
    from podcast_index.build import drop_portrait_topics

    data = {"rtl-231": extraction(("0:04:00", "qualzuchten"), ("0:27:30", "japan-chin"),
                                  ("0:28:00", "rasseportrait-affenpinscher"), ("0:40:00", "rasseportrait"))}
    data["rtl-231"]["segments"][1]["label"] = "Japan Chin"
    data["rtl-231"]["segments"][2]["label"] = "Rasseportrait Affenpinscher"
    data["rtl-231"]["segments"][3]["label"] = "Rasseporträt"

    kept = drop_portrait_topics(data, breed_names={"Japan Chin", "Affenpinscher"})

    assert [s["topic"] for s in kept["rtl-231"]["segments"]] == ["qualzuchten"]



def test_entries_keep_their_own_label_after_mapping():
    topics = [{"id": "rueckruf", "label": "Rückruf", "category": "Erziehung & Training",
               "description": "", "merged_ids": ["rueckruf", "rueckrufsignal"]}]
    episodes = {"rtl-001": {"number": 1, "title": "Eins"}, "rtl-002": {"number": 2, "title": "Zwei"}}
    data = {"rtl-002": extraction(("0:09:00", "rueckrufsignal"))}
    data["rtl-002"]["segments"][0]["label"] = "Rückruf mit der Pfeife"

    [topic] = topic_table(apply_mapping(data, topics), topics, episodes)

    assert topic["label"] == "Rückruf"
    assert topic["entries"][0]["label"] == "Rückruf mit der Pfeife"


def test_dropped_ids_leave_the_index():
    topics = [{"id": "zecken", "label": "Zecken", "category": "Gesundheit & Medizin",
               "description": "", "merged_ids": ["zecken"]}]

    mapped = apply_mapping(EXTRACTIONS, topics, dropped={"rueckruf"})

    assert [s["topic"] for s in mapped["rtl-001"]["segments"]] == ["zecken"]


def test_known_topics_keep_their_fixed_labels():
    from podcast_index.build import fix_known_labels

    topics = fix_known_labels([
        {"id": "qualzuchten", "label": "Riesenwuchs als Qualzucht", "category": "Zucht & Rassen",
         "description": "", "merged_ids": ["qualzuchten"]},
        {"id": "zecken", "label": "Zecken", "category": "Gesundheit & Medizin",
         "description": "", "merged_ids": ["zecken"]},
    ])

    assert [t["label"] for t in topics] == ["Qualzuchten", "Zecken"]


def test_episode_records_carry_dates_audio_breeds_and_portrait():
    from podcast_index.build import episode_records
    from podcast_index.feeds import Episode

    episode = Episode(id="rtl-231", feed="rtl", number=231, title="Ragebait", url="https://x/231.mp3",
                      duration=3882, published="2025-10-02")
    data = extraction(("0:04:00", "qualzuchten"))
    data["breeds"] = [{"name": "Mops", "start": "0:05:00"}]
    data["portrait"] = {"present": True, "breed": "Japan Chin", "start": "0:27:40"}

    records = episode_records([episode], {"rtl-231": data})

    assert records == {"rtl-231": {
        "feed": "rtl", "number": 231, "title": "Ragebait", "published": "2025-10-02",
        "duration": 3882, "audioUrl": "https://x/231.mp3",
        "breeds": [{"name": "Mops", "start": "0:05:00"}],
        "portrait": {"present": True, "breed": "Japan Chin", "start": "0:27:40"},
    }}


class FakeStream:
    """Stands in for client.messages.stream; answers from the ids in the prompt"""

    def __init__(self, answer):
        self.answer = answer
        self.calls = []

    def stream(self, **kwargs):
        prompt = kwargs["messages"][0]["content"]
        ids = {line.split(" | ")[0] for line in prompt.splitlines()[1:]}
        self.calls.append(ids)
        text = json.dumps(self.answer(frozenset(ids)))
        message = SimpleNamespace(
            stop_reason="end_turn", content=[SimpleNamespace(type="text", text=text)]
        )
        return nullcontext(SimpleNamespace(get_final_message=lambda: message))


def item(id_, category, episodes=1):
    return {"id": id_, "label": id_.title(), "category": category, "episodes": episodes, "examples": ["…"]}


def topic_(id_, category, merged):
    return {"id": id_, "label": id_.title(), "category": category, "description": f"{id_}.", "merged_ids": merged}


def test_consolidation_merges_within_each_area_then_across_areas():
    items = [
        item("rueckruf", "Erziehung & Training", 3),
        item("rueckrufsignal", "Erziehung & Training"),
        item("zecken", "Gesundheit & Medizin", 2),
        item("zeckenschutz", "Haltung & Pflege"),
        item("dogge-wesen", "Zucht & Rassen"),
    ]
    answers = {
        frozenset({"rueckruf", "rueckrufsignal"}): {
            "topics": [topic_("rueckruf", "Erziehung & Training", ["rueckruf", "rueckrufsignal"])],
            "dropped_ids": [],
        },
        frozenset({"zecken"}): {"topics": [topic_("zecken", "Gesundheit & Medizin", ["zecken"])], "dropped_ids": []},
        frozenset({"zeckenschutz"}): {
            "topics": [topic_("zeckenschutz", "Haltung & Pflege", ["zeckenschutz"])],
            "dropped_ids": [],
        },
        frozenset({"dogge-wesen"}): {"topics": [], "dropped_ids": ["dogge-wesen"]},
        # across areas: the canonical topics of the first pass
        frozenset({"rueckruf", "zecken", "zeckenschutz"}): {
            "topics": [
                topic_("rueckruf", "Erziehung & Training", ["rueckruf"]),
                topic_("zecken", "Gesundheit & Medizin", ["zecken", "zeckenschutz"]),
            ],
            "dropped_ids": [],
        },
    }
    client = SimpleNamespace(messages=FakeStream(answers.__getitem__))

    topics, dropped = build.consolidate(client, items)

    assert sorted((t["id"], sorted(t["merged_ids"])) for t in topics) == [
        ("rueckruf", ["rueckruf", "rueckrufsignal"]),
        ("zecken", ["zecken", "zeckenschutz"]),
    ]
    assert dropped == ["dogge-wesen"]
    # one call per area, one across areas
    assert len(client.messages.calls) == 5


def test_consolidation_keeps_ids_the_model_left_out():
    items = [item("rueckruf", "Erziehung & Training"), item("leine", "Erziehung & Training")]

    def answer(ids):
        return {
            "topics": [topic_("rueckruf", "Erziehung & Training", ["rueckruf"])],
            "dropped_ids": [],
        }

    topics, dropped = build.consolidate(SimpleNamespace(messages=FakeStream(answer)), items)

    assert sorted(t["id"] for t in topics) == ["leine", "rueckruf"]
    assert dropped == []


def test_a_canonical_id_is_always_one_of_the_merged_ids():
    items = [item("rueckruf", "Erziehung & Training"), item("rueckrufsignal", "Erziehung & Training")]

    def answer(ids):
        return {
            "topics": [topic_("rueckruf-neu", "Erziehung & Training", sorted(ids))],
            "dropped_ids": [],
        }

    topics, _ = build.consolidate(SimpleNamespace(messages=FakeStream(answer)), items)

    assert [(t["id"], sorted(t["merged_ids"])) for t in topics] == [
        ("rueckruf", ["rueckruf", "rueckrufsignal"])
    ]


def test_segments_without_a_topic_are_dropped():
    data = {"rtl-101": extraction(("0:49:35", ""), ("0:50:00", "zecken"))}

    kept = build.drop_portrait_topics(data, set())

    assert [s["topic"] for s in kept["rtl-101"]["segments"]] == ["zecken"]


class NoCalls:
    def stream(self, **kwargs):
        raise AssertionError("no API call expected")


def test_consolidation_reuses_saved_results_per_area(tmp_path):
    items = [item("rueckruf", "Erziehung & Training"), item("zecken", "Gesundheit & Medizin")]
    saved = {
        "erziehung-training": {"topics": [topic_("rueckruf", "Erziehung & Training", ["rueckruf"])], "dropped_ids": []},
        "gesundheit-medizin": {"topics": [topic_("zecken", "Gesundheit & Medizin", ["zecken"])], "dropped_ids": []},
        "_across": {"topics": [], "dropped_ids": []},
    }
    for name, result in saved.items():
        (tmp_path / f"{name}.json").write_text(json.dumps(result))

    topics, dropped = build.consolidate(SimpleNamespace(messages=NoCalls()), items, cache_dir=tmp_path)

    assert sorted(t["id"] for t in topics) == ["rueckruf", "zecken"]
    assert dropped == []


def test_consolidation_saves_each_answer(tmp_path):
    items = [item("rueckruf", "Erziehung & Training")]

    def answer(ids):
        return {"topics": [topic_("rueckruf", "Erziehung & Training", ["rueckruf"])], "dropped_ids": []}

    build.consolidate(SimpleNamespace(messages=FakeStream(answer)), items, cache_dir=tmp_path)

    assert sorted(p.name for p in tmp_path.iterdir()) == ["_across.json", "erziehung-training.json"]
