"""Upload route for parsing PDF files."""

import uuid
from fastapi import APIRouter, File, HTTPException, UploadFile, Request

from ..parser import extract_clauses
from ..utils.logging import logger
from ..state import documents

router = APIRouter()


@router.post("/upload")
async def upload(request: Request, file: UploadFile = File(...)):
    if file.content_type != "application/pdf":
        raise HTTPException(status_code=400, detail="Invalid file type")

    tmp_path = f"/tmp/{uuid.uuid4()}.pdf"
    with open(tmp_path, "wb") as buffer:
        buffer.write(await file.read())

    clauses = extract_clauses(tmp_path)
    doc_id = str(uuid.uuid4())
    documents[doc_id] = clauses
    logger.info(
        "upload",
        extra={
            "event": "upload",
            "ip": request.client.host if request.client else None,
            "count": len(clauses),
            "document_id": doc_id,
        },
    )
    return {"document_id": doc_id, "clauses": clauses}
