from pydantic import BaseModel
from typing import List, Optional

class Clause(BaseModel):
    text: str
    explanation: str
    tags: List[str] = []
    severity: int = 1

class DocumentResponse(BaseModel):
    clauses: List[Clause]

class ReanalyzeRequest(BaseModel):
    id: int
    text: str
    tone: str = "Plain"
