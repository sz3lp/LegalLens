from typing import Dict, List
from .utils.schema import Clause

# Simple in-memory store for uploaded documents
# Keyed by generated document ID

documents: Dict[str, List[Clause]] = {}
