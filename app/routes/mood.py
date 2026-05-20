from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List
import sqlite3

router = APIRouter()

class MoodEntry(BaseModel):
    session_id: str
    score: int
    note: str = ""

class MoodResponse(BaseModel):
    id: int
    session_id: str
    score: int
    note: str
    date: str

class AnalyticsResponse(BaseModel):
    dates: List[str]
    scores: List[int]
    average: float
    highest: int
    lowest: int

def get_db():
    conn = sqlite3.connect("mindease.db")
    conn.row_factory = sqlite3.Row
    return conn

def init_mood_table():
    conn = get_db()
    conn.execute("""
        CREATE TABLE IF NOT EXISTS moods (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            session_id TEXT NOT NULL,
            score INTEGER NOT NULL,
            note TEXT DEFAULT '',
            created_at TEXT DEFAULT (date('now'))
        )
    """)
    conn.commit()
    conn.close()

init_mood_table()

@router.post("/mood", response_model=MoodResponse)
def save_mood(entry: MoodEntry):
    if not 1 <= entry.score <= 10:
        raise HTTPException(status_code=400, detail="Score must be between 1 and 10")

    conn = get_db()
    cursor = conn.execute(
        "INSERT INTO moods (session_id, score, note) VALUES (?, ?, ?)",
        (entry.session_id, entry.score, entry.note)
    )
    conn.commit()
    row_id = cursor.lastrowid
    row = conn.execute("SELECT * FROM moods WHERE id = ?", (row_id,)).fetchone()
    conn.close()

    return MoodResponse(
        id=row["id"],
        session_id=row["session_id"],
        score=row["score"],
        note=row["note"],
        date=row["created_at"]
    )

@router.get("/analytics/{session_id}", response_model=AnalyticsResponse)
def get_analytics(session_id: str, days: int = 7):
    conn = get_db()
    rows = conn.execute("""
        SELECT score, created_at
        FROM moods
        WHERE session_id = ?
        ORDER BY created_at DESC
        LIMIT ?
    """, (session_id, days)).fetchall()
    conn.close()

    if not rows:
        raise HTTPException(status_code=404, detail="No mood data found")

    scores = [r["score"] for r in rows]
    dates  = [r["created_at"] for r in rows]

    return AnalyticsResponse(
        dates=list(reversed(dates)),
        scores=list(reversed(scores)),
        average=round(sum(scores) / len(scores), 1),
        highest=max(scores),
        lowest=min(scores)
    )