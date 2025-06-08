from fastapi import APIRouter, HTTPException
from ..state import documents

router = APIRouter()

@router.get("/document/{doc_id}")
async def get_document(doc_id: str):
    if doc_id not in documents:
        raise HTTPException(status_code=404, detail="Document not found")
    return {"clauses": documents[doc_id]}
