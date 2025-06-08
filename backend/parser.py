"""Utilities for extracting clauses from a PDF."""

from __future__ import annotations

import re
from typing import Dict, List

import pdfplumber


def _split_long_text(text: str, max_len: int = 300) -> List[str]:
    """Split a long paragraph into chunks no longer than max_len."""
    sentences = re.split(r"(?<=\.)\s+", text)
    chunks: List[str] = []
    current = ""
    for sentence in sentences:
        if len(current) + len(sentence) > max_len and current:
            chunks.append(current.strip())
            current = sentence
        else:
            current += (" " if current else "") + sentence
    if current.strip():
        chunks.append(current.strip())
    return chunks


def extract_clauses(file_path: str) -> List[Dict[str, str]]:
    """Open a PDF and return a list of clause dictionaries with ids."""

    with pdfplumber.open(file_path) as pdf:
        text = "\n".join(page.extract_text() or "" for page in pdf.pages)

    raw_parts = re.split(r"\n{2,}", text)
    clauses: List[Dict[str, str]] = []
    cid = 1
    for part in raw_parts:
        cleaned = part.strip()
        if not cleaned:
            continue

        pieces = [cleaned] if len(cleaned) <= 300 else _split_long_text(cleaned)

        for piece in pieces:
            clauses.append({"id": cid, "text": piece})
            cid += 1

    return clauses
