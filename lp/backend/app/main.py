"""PyLearn AI — FastAPI Application Entry Point."""

from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import settings
from app.core.database import init_db
from app.auth.router import router as auth_router
from app.courses.router import router as courses_router
from app.agents.router import router as agents_router
from app.seed import seed_courses


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Startup: create DB tables & seed curriculum data."""
    await init_db()
    await seed_courses()
    yield


app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
    description="Python + Data Science + AI Learning Platform with AI-powered code review agents",
    lifespan=lifespan,
)

# ── CORS ──────────────────────────────────────────────────────────
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── Routers ───────────────────────────────────────────────────────
app.include_router(auth_router)
app.include_router(courses_router)
app.include_router(agents_router)


# ── Health Check ──────────────────────────────────────────────────
@app.get("/api/health")
async def health():
    return {
        "status": "healthy",
        "app": settings.APP_NAME,
        "version": settings.APP_VERSION,
    }
