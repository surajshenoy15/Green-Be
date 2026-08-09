from datetime import datetime, timezone

from fastapi import APIRouter, Depends, HTTPException, Query, UploadFile
from sqlalchemy import func, or_, select
from sqlalchemy.ext.asyncio import AsyncSession

from ..database import get_db
from ..deps import get_current_admin
from ..models import AdminUser, BlogPost
from ..schemas import (
    AdminBlogListResponse,
    BlogAdmin,
    BlogCreate,
    BlogStats,
    BlogUpdate,
    UploadResponse,
)
from ..storage import upload_image
from ..utils import estimate_read_time, unique_slug

router = APIRouter(prefix="/admin", tags=["admin"], dependencies=[Depends(get_current_admin)])


@router.get("/stats", response_model=BlogStats)
async def stats(db: AsyncSession = Depends(get_db)) -> BlogStats:
    total = await db.scalar(select(func.count(BlogPost.id))) or 0
    published = await db.scalar(select(func.count(BlogPost.id)).where(BlogPost.status == "published")) or 0
    drafts = await db.scalar(select(func.count(BlogPost.id)).where(BlogPost.status == "draft")) or 0
    featured = await db.scalar(select(func.count(BlogPost.id)).where(BlogPost.featured.is_(True))) or 0
    return BlogStats(total=total, published=published, drafts=drafts, featured=featured)


@router.get("/posts", response_model=AdminBlogListResponse)
async def list_posts(
    limit: int = Query(default=50, ge=1, le=100),
    offset: int = Query(default=0, ge=0),
    status: str | None = None,
    q: str | None = None,
    db: AsyncSession = Depends(get_db),
) -> AdminBlogListResponse:
    filters = []
    if status in {"draft", "published"}:
        filters.append(BlogPost.status == status)
    if q:
        needle = f"%{q.strip()}%"
        filters.append(or_(BlogPost.title.ilike(needle), BlogPost.slug.ilike(needle), BlogPost.category.ilike(needle)))

    total = await db.scalar(select(func.count(BlogPost.id)).where(*filters)) or 0
    posts = (
        await db.scalars(
            select(BlogPost)
            .where(*filters)
            .order_by(BlogPost.updated_at.desc(), BlogPost.id.desc())
            .offset(offset)
            .limit(limit)
        )
    ).all()
    return AdminBlogListResponse(items=[BlogAdmin.model_validate(p) for p in posts], total=total)


@router.get("/posts/{post_id}", response_model=BlogAdmin)
async def get_post(post_id: int, db: AsyncSession = Depends(get_db)) -> BlogPost:
    post = await db.get(BlogPost, post_id)
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    return post


async def apply_payload(db: AsyncSession, post: BlogPost, payload: BlogCreate | BlogUpdate) -> BlogPost:
    data = payload.model_dump()
    desired_slug = (data.pop("slug") or payload.title).strip()
    post.slug = await unique_slug(db, desired_slug, exclude_id=post.id if post.id else None)
    for key, value in data.items():
        setattr(post, key, value)
    post.read_time_minutes = estimate_read_time(post.content_html)
    if post.status == "published" and not post.published_at:
        post.published_at = datetime.now(timezone.utc)
    if post.status == "draft":
        post.published_at = None
    return post


@router.post("/posts", response_model=BlogAdmin, status_code=201)
async def create_post(payload: BlogCreate, db: AsyncSession = Depends(get_db)) -> BlogPost:
    post = BlogPost(title=payload.title, slug="pending")
    db.add(post)
    await apply_payload(db, post, payload)
    await db.commit()
    await db.refresh(post)
    return post


@router.put("/posts/{post_id}", response_model=BlogAdmin)
async def update_post(post_id: int, payload: BlogUpdate, db: AsyncSession = Depends(get_db)) -> BlogPost:
    post = await db.get(BlogPost, post_id)
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    await apply_payload(db, post, payload)
    await db.commit()
    await db.refresh(post)
    return post


@router.delete("/posts/{post_id}", status_code=204)
async def delete_post(post_id: int, db: AsyncSession = Depends(get_db)) -> None:
    post = await db.get(BlogPost, post_id)
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    await db.delete(post)
    await db.commit()


@router.post("/posts/{post_id}/publish", response_model=BlogAdmin)
async def publish_post(post_id: int, db: AsyncSession = Depends(get_db)) -> BlogPost:
    post = await db.get(BlogPost, post_id)
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    if not post.title.strip() or not post.content_html.strip():
        raise HTTPException(status_code=400, detail="A title and article content are required before publishing")
    post.status = "published"
    post.published_at = datetime.now(timezone.utc)
    await db.commit()
    await db.refresh(post)
    return post


@router.post("/posts/{post_id}/unpublish", response_model=BlogAdmin)
async def unpublish_post(post_id: int, db: AsyncSession = Depends(get_db)) -> BlogPost:
    post = await db.get(BlogPost, post_id)
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    post.status = "draft"
    post.published_at = None
    await db.commit()
    await db.refresh(post)
    return post


@router.post("/uploads", response_model=UploadResponse)
async def upload(file: UploadFile, _admin: AdminUser = Depends(get_current_admin)) -> UploadResponse:
    url, path = await upload_image(file)
    return UploadResponse(url=url, path=path)
