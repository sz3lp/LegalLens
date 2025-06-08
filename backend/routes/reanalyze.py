from fastapi import APIRouter, Request
from ..gpt_client import reanalyze_clause
from ..utils.schema import ReanalyzeRequest
from ..utils.logging import logger

router = APIRouter()

@router.post("/reanalyze")
async def reanalyze(request: Request, req: ReanalyzeRequest):
    explanation = await reanalyze_clause(req.text, req.tone)
    logger.info(
        "reanalyze",
        extra={
            "event": "reanalyze",
            "ip": request.client.host if request.client else None,
            "tone": req.tone,
        },
    )
    return {"id": req.id, "text": req.text, "explanation": explanation}
