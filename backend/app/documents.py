import json
import sqlite3

from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel

from . import db
from .auth import get_current_user_id

router = APIRouter(prefix="/api/documents", tags=["documents"])


class DocumentIn(BaseModel):
    documentType: str
    title: str
    values: dict


class DocumentSummary(BaseModel):
    id: int
    documentType: str
    title: str
    updatedAt: str


class DocumentOut(DocumentSummary):
    values: dict
    createdAt: str


def _row_to_summary(row: sqlite3.Row) -> DocumentSummary:
    return DocumentSummary(
        id=row["id"],
        documentType=row["document_type"],
        title=row["title"],
        updatedAt=row["updated_at"],
    )


def _row_to_out(row: sqlite3.Row) -> DocumentOut:
    return DocumentOut(
        id=row["id"],
        documentType=row["document_type"],
        title=row["title"],
        values=json.loads(row["values_json"]),
        createdAt=row["created_at"],
        updatedAt=row["updated_at"],
    )


def _get_owned_document(conn: sqlite3.Connection, document_id: int, user_id: int) -> sqlite3.Row:
    row = conn.execute(
        "SELECT * FROM documents WHERE id = ? AND user_id = ?", (document_id, user_id)
    ).fetchone()
    if row is None:
        raise HTTPException(status_code=404, detail="Document not found")
    return row


@router.get("")
def list_documents(user_id: int = Depends(get_current_user_id)) -> list[DocumentSummary]:
    conn = db.get_connection()
    try:
        rows = conn.execute(
            "SELECT id, document_type, title, updated_at FROM documents "
            "WHERE user_id = ? ORDER BY updated_at DESC",
            (user_id,),
        ).fetchall()
    finally:
        conn.close()
    return [_row_to_summary(row) for row in rows]


@router.post("", status_code=201)
def create_document(
    payload: DocumentIn, user_id: int = Depends(get_current_user_id)
) -> DocumentOut:
    conn = db.get_connection()
    try:
        cur = conn.execute(
            "INSERT INTO documents (user_id, document_type, title, values_json) "
            "VALUES (?, ?, ?, ?)",
            (user_id, payload.documentType, payload.title, json.dumps(payload.values)),
        )
        conn.commit()
        row = conn.execute("SELECT * FROM documents WHERE id = ?", (cur.lastrowid,)).fetchone()
    finally:
        conn.close()
    return _row_to_out(row)


@router.get("/{document_id}")
def get_document(document_id: int, user_id: int = Depends(get_current_user_id)) -> DocumentOut:
    conn = db.get_connection()
    try:
        row = _get_owned_document(conn, document_id, user_id)
    finally:
        conn.close()
    return _row_to_out(row)


@router.put("/{document_id}")
def update_document(
    document_id: int, payload: DocumentIn, user_id: int = Depends(get_current_user_id)
) -> DocumentOut:
    conn = db.get_connection()
    try:
        _get_owned_document(conn, document_id, user_id)
        conn.execute(
            "UPDATE documents SET document_type = ?, title = ?, values_json = ?, "
            "updated_at = datetime('now') WHERE id = ?",
            (payload.documentType, payload.title, json.dumps(payload.values), document_id),
        )
        conn.commit()
        row = conn.execute("SELECT * FROM documents WHERE id = ?", (document_id,)).fetchone()
    finally:
        conn.close()
    return _row_to_out(row)


@router.delete("/{document_id}", status_code=204)
def delete_document(document_id: int, user_id: int = Depends(get_current_user_id)) -> None:
    conn = db.get_connection()
    try:
        _get_owned_document(conn, document_id, user_id)
        conn.execute("DELETE FROM documents WHERE id = ?", (document_id,))
        conn.commit()
    finally:
        conn.close()
