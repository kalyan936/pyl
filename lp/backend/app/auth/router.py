"""Authentication endpoints — register, login, profile."""

from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from pydantic import BaseModel, EmailStr
from typing import Optional

from app.core.database import get_db
from app.core.security import (
    hash_password, verify_password, create_access_token, get_current_user_id
)
from app.models.models import User, AuditLog

router = APIRouter(prefix="/api/auth", tags=["Authentication"])


# ── Schemas ────────────────────────────────────────────────────────
class RegisterRequest(BaseModel):
    email: str
    username: str
    password: str
    full_name: Optional[str] = ""


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"


class UserResponse(BaseModel):
    id: int
    email: str
    username: str
    full_name: str
    is_admin: bool

    class Config:
        from_attributes = True


# ── Endpoints ──────────────────────────────────────────────────────
@router.post("/register", response_model=UserResponse, status_code=201)
async def register(req: RegisterRequest, db: AsyncSession = Depends(get_db)):
    # Check duplicates
    existing = await db.execute(
        select(User).where((User.email == req.email) | (User.username == req.username))
    )
    if existing.scalar_one_or_none():
        raise HTTPException(status_code=409, detail="Email or username already exists")

    user = User(
        email=req.email,
        username=req.username,
        hashed_password=hash_password(req.password),
        full_name=req.full_name or "",
    )
    db.add(user)
    await db.flush()
    await db.refresh(user)

    # Audit log
    db.add(AuditLog(user_id=user.id, action="register", details={"username": user.username}))
    return user


@router.post("/login", response_model=TokenResponse)
async def login(form: OAuth2PasswordRequestForm = Depends(), db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(User).where(User.username == form.username))
    user = result.scalar_one_or_none()

    if not user or not verify_password(form.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    if not user.is_active:
        raise HTTPException(status_code=403, detail="Account deactivated")

    token = create_access_token(data={"sub": str(user.id), "username": user.username})

    # Audit log
    db.add(AuditLog(user_id=user.id, action="login", details={"method": "password"}))
    return TokenResponse(access_token=token)


@router.get("/me", response_model=UserResponse)
async def get_profile(user_id: int = Depends(get_current_user_id), db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(User).where(User.id == user_id))
    user = result.scalar_one_or_none()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user
