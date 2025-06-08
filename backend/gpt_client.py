import os
import json
from dotenv import load_dotenv
import openai

load_dotenv()

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
openai.api_key = OPENAI_API_KEY

SYSTEM_PROMPT = (
    "You are a legal assistant providing plain-English explanations of contract clauses."
)

async def explain_text(text: str) -> str:
    """Call OpenAI asynchronously to get an explanation for the provided text."""
    if not OPENAI_API_KEY:
        return f"(demo) Explanation for: {text[:60]}"

    response = await openai.ChatCompletion.acreate(
        model="gpt-4o",
        messages=[
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": text},
        ],
    )
    return response.choices[0].message.content.strip()


def explain_clause(clause_text: str) -> str:
    """Return a plain-English explanation for a single clause."""
    if not OPENAI_API_KEY:
        return "Explanation unavailable (no API key configured)."

    response = openai.ChatCompletion.create(
        model="gpt-4",
        messages=[
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": f"Explain the following legal clause in plain English: {clause_text}"},
        ],
    )
    return response.choices[0].message.content.strip()


def analyze_clause(clause_text: str) -> dict:
    """Return explanation with brief summary, tags and severity."""
    if not OPENAI_API_KEY:
        return {
            "explanation": "Explanation unavailable (no API key configured).",
            "briefSummary": clause_text[:60],
            "tags": [],
            "severity": 1,
        }

    prompt = (
        "Explain the following legal clause in plain English. "
        "Provide a JSON object with fields 'explanation', 'briefSummary', "
        "'tags', and 'severity' (1-5). Clause: " + clause_text
    )

    response = openai.ChatCompletion.create(
        model="gpt-4",
        messages=[
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": prompt},
        ],
    )

    content = response.choices[0].message.content.strip()
    try:
        return json.loads(content)
    except Exception:
        return {
            "explanation": content,
            "briefSummary": "",
            "tags": [],
            "severity": 1,
        }


async def reanalyze_clause(clause_text: str, tone: str) -> str:
    """Return an explanation with the requested tone."""
    if not OPENAI_API_KEY:
        return f"(demo {tone}) {clause_text[:60]}"

    style = {
        "Plain": "Explain simply:",
        "Friendly": "Explain like you're a helpful friend:",
        "Formal": "Explain in professional legal terms:",
    }.get(tone, "Explain simply:")

    return await explain_text(f"{style} {clause_text}")
