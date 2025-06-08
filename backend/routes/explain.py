from fastapi import APIRouter, Request
from typing import List, Dict

from ..gpt_client import analyze_clause
from ..utils.logging import logger

router = APIRouter()

@router.post("/explain")
async def explain(request: Request, clauses: Dict[str, List[Dict]]):
    """Return detailed explanations for provided clauses."""
    data = []
    for item in clauses.get("clauses", []):
        cid = item.get("id")
        text = item.get("text", "")
        details = analyze_clause(text)
        details.update({"id": cid, "original": text})
        data.append(details)
    logger.info(
        "explain",
        extra={
            "event": "explain",
            "ip": request.client.host if request.client else None,
            "count": len(data),
        },
    )
    return {"clauses": data}
