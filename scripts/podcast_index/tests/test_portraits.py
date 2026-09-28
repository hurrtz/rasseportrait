from podcast_index.portraits import replace_timecode, site_portraits


BREED_FILE = '''export default {
  id: 206,
  podcast: [
    {
      number: 12,
      episode: "Etwas anderes",
      meta: { internal: "other", public: "Hörerfrage", timecode: 100, airDate: "2022-01-01" },
    },
    {
      number: 231,
      episode: "Ragebait, Qualzucht & Elch Erwin",
      sources: [],
      meta: {
        internal: "portrait",
        public: "Rasseportrait",
        timecode: 1845,
        airDate: "2025-10-02",
      },
    },
  ],
} satisfies Breed;
'''


def test_replace_timecode_edits_only_the_matching_episode():
    updated = replace_timecode(BREED_FILE, "Ragebait, Qualzucht & Elch Erwin", 1845, 1660)

    assert "timecode: 1660," in updated
    assert "timecode: 100," in updated
    assert updated.count("timecode:") == 2


def test_replace_timecode_refuses_when_the_old_value_differs():
    try:
        replace_timecode(BREED_FILE, "Ragebait, Qualzucht & Elch Erwin", 999, 1660)
    except ValueError:
        return
    raise AssertionError("expected ValueError")


def test_site_portraits_lists_portrait_entries_of_raw_breeds():
    data = {"breeds": [
        {"id": 206, "details": {"public": ["Japan Chin"]}, "podcast": [
            {"number": 231, "episode": "Ragebait", "meta": {"internal": "portrait", "timecode": 1845, "airDate": "2025-11-06"}},
            {"number": 12, "episode": "Anders", "meta": {"internal": "other", "timecode": 100}},
        ]},
    ]}

    assert site_portraits(data) == [
        {"breedId": 206, "breed": "Japan Chin", "number": 231, "episode": "Ragebait", "timecode": 1845, "airDate": "2025-11-06"}
    ]
