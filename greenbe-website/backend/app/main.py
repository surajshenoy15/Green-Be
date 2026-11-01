from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import func, select

from .auth import hash_password
from .config import get_settings
from .database import Base, SessionLocal, engine
from .models import AdminUser  # noqa: F401 - registers metadata
from .routers import admin, auth, public


settings = get_settings()


async def ensure_seed_admin() -> None:
    """Create the initial admin only when explicitly configured and missing."""
    if not settings.admin_seed_email or not settings.admin_seed_password:
        return

    async with SessionLocal() as db:
        existing = await db.scalar(
            select(AdminUser).where(
                func.lower(AdminUser.email) == settings.admin_seed_email.strip().lower()
            )
        )
        if existing:
            return
        db.add(
            AdminUser(
                email=settings.admin_seed_email.strip().lower(),
                full_name=settings.admin_seed_name,
                password_hash=hash_password(settings.admin_seed_password),
            )
        )
        await db.commit()


@asynccontextmanager
async def lifespan(_: FastAPI):
    settings.validate_runtime()

    # SQLAlchemy create_all only creates missing tables. It does not drop or
    # reset existing tables, but use controlled SQL/migrations in production.
    if settings.auto_create_tables:
        async with engine.begin() as conn:
            await conn.run_sync(Base.metadata.create_all)

    await ensure_seed_admin()
    try:
        yield
    finally:
        await engine.dispose()


app = FastAPI(title="GreenBe Website CMS API", version="1.1.0", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Keep these routes unchanged: the React/Vite frontend expects /api/...
app.include_router(auth.router, prefix="/api")
app.include_router(public.router, prefix="/api")
app.include_router(admin.router, prefix="/api")


@app.get("/api/health", tags=["health"])
async def health() -> dict[str, str]:
    return {"status": "ok", "environment": settings.environment}
