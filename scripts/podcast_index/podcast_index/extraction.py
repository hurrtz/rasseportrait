"""Topic extraction: one Claude request per episode transcript."""

from __future__ import annotations

import json
from typing import Any

MODEL = "claude-opus-5"
MAX_TOKENS = 32000

# Existing Hundewissen topics; the model reuses these ids where they fit
KNOWN_TOPICS = {
    "hundesprache": "Hundesprache",
    "jagdhunde": "Jagdhunde",
    "medizin": "Medizin",
    "qualzuchten": "Qualzuchten",
    "schutzhunde": "Schutzhunde",
    "silvester": "Silvester",
    "tierversuche": "Tierversuche",
}

CATEGORIES = [
    "Verhalten & Kommunikation",
    "Erziehung & Training",
    "Gesundheit & Medizin",
    "Ernährung",
    "Haltung & Pflege",
    "Zucht & Rassen",
    "Tierschutz & Ethik",
    "Recht & Politik",
    "Hundesport & Arbeitshunde",
    "Mensch-Hund-Beziehung",
    "Wissenschaft & Forschung",
    "Andere Tiere",
]

SYSTEM = f"""Du erstellst einen Themenindex für den Podcast „Tierisch Menschlich“ mit Hundeprofi Martin Rütter und Wissenschaftsjournalistin Katharina Adick. Der Index zeigt, welche Wissensthemen eine Folge behandelt und ab welchem Zeitpunkt, damit eine Website Hörerinnen und Hörer an die richtige Stelle führen kann. Die Transkripte werden nicht veröffentlicht, nur dein Index.

Du bekommst ein automatisches Transkript: jede Zeile beginnt mit einem Zeitstempel [h:mm:ss] für etwa 10 Sekunden Gesprochenes. Hörfehler kommen vor.

Was in den Index gehört: alles, was Wissen über Hunde und Tiere vermittelt. Verhalten und Körpersprache, Erziehung und Training, Gesundheit und Tiermedizin, Ernährung, Haltung und Pflege, Zucht und Rassen (auch Qualzucht), Tierschutz, Recht und Politik rund ums Tier, Hundesport und Arbeitshunde, Mensch-Hund-Beziehung, Forschung, und Wissen über andere Tiere. Auch Hörerfragen, Expertengespräche und Anekdoten, sofern sie ein Wissensthema tragen. Jedes Thema braucht einen klaren Bezug zu Tieren. Nicht in den Index: privater Smalltalk, Werbung, Intro/Outro, Medien- und Freizeittipps, allgemeine Gesellschafts-, Klima-, Wetter- oder Psychologiethemen, solange sie nicht ausdrücklich auf Tiere bezogen werden.

Themen: Sei gründlich und vollständig. Jedes eigenständige Wissensthema bekommt einen Eintrag; die Themenliste wird später zusammengefasst, fehlende Themen lassen sich aber nicht nachträglich finden. Wähle Themen so spezifisch, dass sie für Hörer nützlich sind, und so allgemein, dass sie in anderen Folgen wieder vorkommen können (z. B. „Rückruf“, „Leinenführigkeit“, „Trennungsangst“, „Kastration“, „Zecken und Parasiten“, „Brachyzephalie“, „Welpenhandel“). Nutze für diese vorhandenen Themen genau diese ids: {json.dumps(KNOWN_TOPICS, ensure_ascii=False)}. Für alle anderen vergib eine kebab-case id auf Deutsch; nur in der id werden Umlaute ersetzt (ae/oe/ue/ss). Label und Zusammenfassung schreibst du in normalem Deutsch mit Umlauten.

Abschnitte: Ein Abschnitt ist eine zusammenhängende Besprechung eines Themas. Teile eine durchgehende Besprechung nicht in mehrere Abschnitte auf, auch wenn sie länger ist. Wird ein Thema nach einem anderen Teil später wieder aufgegriffen, ist das ein neuer Abschnitt. start ist der Zeitstempel der Zeile, in der das Thema beginnt, end der Zeitstempel der letzten Zeile dazu. „main“ heißt: mindestens etwa eine Minute; „side“: kurz, aber mit einer echten Information.

Zusammenfassungen: ein deutscher Satz in eigenen Worten, sachlich, keine Zitate über fünf Wörter. Gib die Abschnitte in zeitlicher Reihenfolge aus.

Rasseportrait: Viele Folgen enthalten ein Ratespiel zu einer Hunderasse („Rasseportrait“). Das Portrait selbst ist kein Abschnitt und kein Thema, weil die Rassen eigene Seiten haben; Wissensthemen, die darin vertieft werden (etwa Qualzucht-Merkmale der Rasse), bekommen aber eigene Abschnitte. Trage das Portrait unter portrait ein: start ist der Zeitstempel der Zeile, in der das Portrait angekündigt wird (Nennung von „Rasseporträt“ oder der FCI-Standardnummer als Einstieg ins Ratespiel), breed die aufgelöste Rasse. Gibt es keines, present = false und leere Strings.

Rassen: Liste alle Hunderassen, über die mehr als nur beiläufig gesprochen wird, mit dem ersten Zeitstempel."""

SCHEMA: dict[str, Any] = {
    "type": "object",
    "properties": {
        "segments": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "start": {"type": "string"},
                    "end": {"type": "string"},
                    "topic": {"type": "string"},
                    "label": {"type": "string"},
                    "category": {"type": "string", "enum": CATEGORIES},
                    "weight": {"type": "string", "enum": ["main", "side"]},
                    "kind": {
                        "type": "string",
                        "enum": [
                            "discussion",
                            "listener_question",
                            "expert",
                            "anecdote",
                            "news",
                        ],
                    },
                    "summary": {"type": "string"},
                },
                "required": [
                    "start",
                    "end",
                    "topic",
                    "label",
                    "category",
                    "weight",
                    "kind",
                    "summary",
                ],
                "additionalProperties": False,
            },
        },
        "breeds": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "name": {"type": "string"},
                    "start": {"type": "string"},
                },
                "required": ["name", "start"],
                "additionalProperties": False,
            },
        },
        "portrait": {
            "type": "object",
            "properties": {
                "present": {"type": "boolean"},
                "breed": {"type": "string"},
                "start": {"type": "string"},
            },
            "required": ["present", "breed", "start"],
            "additionalProperties": False,
        },
    },
    "required": ["segments", "breeds", "portrait"],
    "additionalProperties": False,
}


def build_params(title: str, transcript: str, effort: str = "medium") -> dict[str, Any]:
    """Messages API parameters for one episode (also used inside a batch)."""
    return {
        "model": MODEL,
        "max_tokens": MAX_TOKENS,
        "system": SYSTEM,
        "thinking": {"type": "adaptive"},
        "output_config": {
            "effort": effort,
            "format": {"type": "json_schema", "schema": SCHEMA},
        },
        "messages": [
            {
                "role": "user",
                "content": f"Folge: {title}\n\nTranskript:\n{transcript}",
            }
        ],
    }


def parse_message(message: Any) -> dict[str, Any]:
    """The index JSON from a finished message; raises on refusal or truncation."""
    if message.stop_reason == "refusal":
        raise RuntimeError(f"refused: {message.stop_details}")
    if message.stop_reason == "max_tokens":
        raise RuntimeError("output truncated at max_tokens")
    text = next(block.text for block in message.content if block.type == "text")
    return json.loads(text)
