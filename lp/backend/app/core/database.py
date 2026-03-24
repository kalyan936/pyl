"""Database connection and session management."""

from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession, async_sessionmaker
from sqlalchemy.orm import DeclarativeBase
from app.core.config import settings


# For SQLite fallback in dev, swap driver
db_url = settings.DATABASE_URL
if db_url.startswith("sqlite"):
    db_url = db_url.replace("sqlite://", "sqlite+aiosqlite://", 1) if "aiosqlite" not in db_url else db_url

engine = create_async_engine(db_url, echo=settings.APP_DEBUG)
async_session = async_sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)


class Base(DeclarativeBase):
    pass


async def get_db():
    """Dependency: yields an async DB session."""
    async with async_session() as session:
        try:
            yield session
            await session.commit()
        except Exception:
            await session.rollback()
            raise


async def init_db():
    """Create all tables (dev convenience — use Alembic in production)."""
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
