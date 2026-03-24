"""Agent API endpoints — code review, error explanation, doubt clearing."""

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from pydantic import BaseModel
from typing import Optional

from app.core.database import get_db
from app.core.security import get_current_user_id, encrypt_data
from app.models.models import CodeSubmission, AuditLog
from app.agents.service import review_code, explain_error, clear_doubt

router = APIRouter(prefix="/api/agent", tags=["AI Agents"])


# ── Schemas ────────────────────────────────────────────────────────
class CodeReviewRequest(BaseModel):
    code: str
    language: str = "python"
    module_id: Optional[int] = None


class ErrorExplainRequest(BaseModel):
    error_message: str
    code: str
    language: str = "python"


class DoubtRequest(BaseModel):
    question: str
    context: Optional[str] = None


class AgentResponse(BaseModel):
    response: str
    agent_type: str


# ── Endpoints ──────────────────────────────────────────────────────
@router.post("/review", response_model=AgentResponse)
async def agent_review_code(
    req: CodeReviewRequest,
    user_id: int = Depends(get_current_user_id),
    db: AsyncSession = Depends(get_db),
):
    """Submit code for AI review."""
    feedback = await review_code(req.code, req.language)

    # Save encrypted submission
    submission = CodeSubmission(
        user_id=user_id,
        module_id=req.module_id or 0,
        encrypted_code=encrypt_data(req.code),
        language=req.language,
        agent_feedback=feedback,
    )
    db.add(submission)

    # Audit log
    db.add(AuditLog(
        user_id=user_id,
        action="agent_code_review",
        details={"language": req.language, "code_length": len(req.code)},
    ))

    return AgentResponse(response=feedback, agent_type="code_review")


@router.post("/explain-error", response_model=AgentResponse)
async def agent_explain_error(
    req: ErrorExplainRequest,
    user_id: int = Depends(get_current_user_id),
    db: AsyncSession = Depends(get_db),
):
    """Explain a code error in beginner-friendly terms."""
    explanation = await explain_error(req.error_message, req.code, req.language)

    db.add(AuditLog(
        user_id=user_id,
        action="agent_error_explain",
        details={"error_preview": req.error_message[:200]},
    ))

    return AgentResponse(response=explanation, agent_type="error_explain")


@router.post("/ask", response_model=AgentResponse)
async def agent_ask_doubt(
    req: DoubtRequest,
    user_id: int = Depends(get_current_user_id),
    db: AsyncSession = Depends(get_db),
):
    """Ask a programming/DS/AI question."""
    answer = await clear_doubt(req.question, req.context)

    db.add(AuditLog(
        user_id=user_id,
        action="agent_doubt_clear",
        details={"question_preview": req.question[:200]},
    ))

    return AgentResponse(response=answer, agent_type="doubt_clear")
