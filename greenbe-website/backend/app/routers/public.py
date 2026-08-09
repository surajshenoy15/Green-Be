from datetime import datetime, timezone

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy import func, or_, select
from sqlalchemy.ext.asyncio import AsyncSession

from ..database import get_db
from ..models import BlogPost
from ..schemas import BlogListResponse, BlogPublic

router = APIRouter(prefix="/blogs", tags=["public blogs"])


def public_filters(now: datetime):
    return (
        BlogPost.status == "published",
        BlogPost.published_at.is_not(None),
        BlogPost.published_at <= now,
    )


@router.get("", response_model=BlogListResponse)
async def list_blogs(
    limit: int = Query(default=12, ge=1, le=50),
    offset: int = Query(default=0, ge=0),
    category: str | None = None,
    q: str | None = None,
    db: AsyncSession = Depends(get_db),
) -> BlogListResponse:
    now = datetime.now(timezone.utc)
    filters = list(public_filters(now))
    if category:
        filters.append(func.lower(BlogPost.category) == category.strip().lower())
    if q:
        needle = f"%{q.strip()}%"
        filters.append(or_(BlogPost.title.ilike(needle), BlogPost.excerpt.ilike(needle), BlogPost.category.ilike(needle)))

    total = await db.scalar(select(func.count(BlogPost.id)).where(*filters)) or 0
    stmt = (
        select(BlogPost)
        .where(*filters)
        .order_by(BlogPost.featured.desc(), BlogPost.published_at.desc(), BlogPost.id.desc())
        .offset(offset)
        .limit(limit)
    )
    posts = (await db.scalars(stmt)).all()
    return BlogListResponse(items=[BlogPublic.model_validate(p) for p in posts], total=total)


@router.get("/featured", response_model=list[BlogPublic])
async def featured_blogs(limit: int = Query(default=3, ge=1, le=6), db: AsyncSession = Depends(get_db)):
    now = datetime.now(timezone.utc)
    stmt = (
        select(BlogPost)
        .where(*public_filters(now))
        .order_by(BlogPost.featured.desc(), BlogPost.published_at.desc(), BlogPost.id.desc())
        .limit(limit)
    )
    return (await db.scalars(stmt)).all()


@router.get("/{slug}", response_model=BlogPublic)
async def get_blog(slug: str, db: AsyncSession = Depends(get_db)) -> BlogPost:
    now = datetime.now(timezone.utc)
    post = await db.scalar(select(BlogPost).where(BlogPost.slug == slug, *public_filters(now)))
    if not post:
        raise HTTPException(status_code=404, detail="Story not found")
    return post
