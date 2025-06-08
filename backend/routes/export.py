"""Placeholder export route."""

from fastapi import APIRouter, Request
from fastapi.responses import JSONResponse
from ..utils.logging import logger

router = APIRouter()

@router.get("/export/{session_id}")
async def export(request: Request, session_id: str):
    """Return all clauses for a document session."""
    # Placeholder: would look up session and return full data
    logger.info(
        "export",
        extra={
            "event": "export",
            "ip": request.client.host if request.client else None,
            "session": session_id,
        },
    )
    return JSONResponse({"session_id": session_id, "clauses": []})
