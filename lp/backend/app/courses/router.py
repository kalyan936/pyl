"""Course & module endpoints — curriculum management."""

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from sqlalchemy.orm import selectinload
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime, timezone

from app.core.database import get_db
from app.core.security import get_current_user_id
from app.models.models import Course, Module, UserProgress

router = APIRouter(prefix="/api/courses", tags=["Courses"])


# ── Schemas ────────────────────────────────────────────────────────
class ModuleSchema(BaseModel):
    id: int
    title: str
    slug: str
    content_md: str
    code_template: str
    expected_output: str
    order_index: int
    difficulty: str
    estimated_minutes: int

    class Config:
        from_attributes = True


class CourseSchema(BaseModel):
    id: int
    title: str
    slug: str
    description: str
    category: str
    order_index: int
    icon: str
    modules: List[ModuleSchema] = []

    class Config:
        from_attributes = True


class CourseListItem(BaseModel):
    id: int
    title: str
    slug: str
    description: str
    category: str
    icon: str
    module_count: int
    order_index: int

    class Config:
        from_attributes = True


class ProgressUpdate(BaseModel):
    status: str
    score: Optional[float] = None


# ── Endpoints ──────────────────────────────────────────────────────
@router.get("/", response_model=List[CourseListItem])
async def list_courses(category: Optional[str] = None, db: AsyncSession = Depends(get_db)):
    query = select(Course).where(Course.is_published == True).order_by(Course.order_index)
    if category:
        query = query.where(Course.category == category)

    result = await db.execute(query.options(selectinload(Course.modules)))
    courses = result.scalars().all()

    return [
        CourseListItem(
            id=c.id, title=c.title, slug=c.slug, description=c.description,
            category=c.category, icon=c.icon, module_count=len(c.modules),
            order_index=c.order_index
        )
        for c in courses
    ]


@router.get("/{slug}", response_model=CourseSchema)
async def get_course(slug: str, db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(Course)
        .where(Course.slug == slug, Course.is_published == True)
        .options(selectinload(Course.modules))
    )
    course = result.scalar_one_or_none()
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")
    # Sort modules by order
    course.modules.sort(key=lambda m: m.order_index)
    return course


@router.post("/{module_id}/progress")
async def update_progress(
    module_id: int,
    body: ProgressUpdate,
    user_id: int = Depends(get_current_user_id),
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(
        select(UserProgress).where(
            UserProgress.user_id == user_id,
            UserProgress.module_id == module_id,
        )
    )
    progress = result.scalar_one_or_none()

    now = datetime.now(timezone.utc)

    if progress:
        progress.status = body.status
        if body.score is not None:
            progress.score = body.score
        progress.last_accessed = now
        if body.status == "completed":
            progress.completed_at = now
    else:
        progress = UserProgress(
            user_id=user_id,
            module_id=module_id,
            status=body.status,
            score=body.score or 0.0,
            last_accessed=now,
            completed_at=now if body.status == "completed" else None,
        )
        db.add(progress)

    return {"ok": True, "status": body.status}


@router.get("/progress/me")
async def my_progress(user_id: int = Depends(get_current_user_id), db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(UserProgress).where(UserProgress.user_id == user_id)
    )
    rows = result.scalars().all()
    return [
        {
            "module_id": p.module_id,
            "status": p.status,
            "score": p.score,
            "completed_at": p.completed_at.isoformat() if p.completed_at else None,
        }
        for p in rows
    ]
