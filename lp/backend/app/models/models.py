"""SQLAlchemy models for users, courses, progress, and audit logs."""

from datetime import datetime, timezone
from sqlalchemy import (
    Column, Integer, String, Text, Boolean, DateTime, ForeignKey, Float, JSON
)
from sqlalchemy.orm import relationship
from app.core.database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), unique=True, index=True, nullable=False)
    username = Column(String(100), unique=True, index=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)
    full_name = Column(String(200), default="")
    is_active = Column(Boolean, default=True)
    is_admin = Column(Boolean, default=False)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
    updated_at = Column(DateTime, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))

    progress = relationship("UserProgress", back_populates="user", cascade="all, delete-orphan")
    code_submissions = relationship("CodeSubmission", back_populates="user", cascade="all, delete-orphan")
    audit_logs = relationship("AuditLog", back_populates="user", cascade="all, delete-orphan")


class Course(Base):
    __tablename__ = "courses"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(300), nullable=False)
    slug = Column(String(300), unique=True, index=True, nullable=False)
    description = Column(Text, default="")
    category = Column(String(100), nullable=False)  # python_basics, data_science, ai_ml
    order_index = Column(Integer, default=0)
    icon = Column(String(50), default="📘")
    is_published = Column(Boolean, default=True)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))

    modules = relationship("Module", back_populates="course", cascade="all, delete-orphan")


class Module(Base):
    __tablename__ = "modules"

    id = Column(Integer, primary_key=True, index=True)
    course_id = Column(Integer, ForeignKey("courses.id"), nullable=False)
    title = Column(String(300), nullable=False)
    slug = Column(String(300), nullable=False)
    content_md = Column(Text, default="")  # Markdown lesson content
    code_template = Column(Text, default="")  # Starter code for playground
    expected_output = Column(Text, default="")  # For auto-grading
    order_index = Column(Integer, default=0)
    difficulty = Column(String(20), default="beginner")  # beginner, intermediate, advanced
    estimated_minutes = Column(Integer, default=15)

    course = relationship("Course", back_populates="modules")
    progress = relationship("UserProgress", back_populates="module", cascade="all, delete-orphan")


class UserProgress(Base):
    __tablename__ = "user_progress"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    module_id = Column(Integer, ForeignKey("modules.id"), nullable=False)
    status = Column(String(20), default="not_started")  # not_started, in_progress, completed
    score = Column(Float, default=0.0)
    completed_at = Column(DateTime, nullable=True)
    last_accessed = Column(DateTime, default=lambda: datetime.now(timezone.utc))

    user = relationship("User", back_populates="progress")
    module = relationship("Module", back_populates="progress")


class CodeSubmission(Base):
    """Stores user code — encrypted at the application layer via AES-256."""
    __tablename__ = "code_submissions"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    module_id = Column(Integer, ForeignKey("modules.id"), nullable=False)
    encrypted_code = Column(Text, nullable=False)  # AES-256-GCM encrypted
    language = Column(String(20), default="python")
    agent_feedback = Column(Text, default="")  # AI agent response
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))

    user = relationship("User", back_populates="code_submissions")


class AuditLog(Base):
    """Immutable audit trail for agent interactions and sensitive operations."""
    __tablename__ = "audit_logs"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    action = Column(String(100), nullable=False)  # agent_query, code_review, login, etc.
    details = Column(JSON, default=dict)
    ip_address = Column(String(45), default="")
    timestamp = Column(DateTime, default=lambda: datetime.now(timezone.utc))

    user = relationship("User", back_populates="audit_logs")
