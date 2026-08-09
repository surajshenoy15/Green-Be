import re
import unicodedata

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from .models import BlogPost


def slugify(value: str) -> str:
    value = unicodedata.normalize("NFKD", value).encode("ascii", "ignore").decode("ascii")
    value = re.sub(r"[^a-zA-Z0-9]+", "-", value.lower()).strip("-")
    return value[:220] or "story"


async def unique_slug(db: AsyncSession, desired: str, exclude_id: int | None = None) -> str:
    base = slugify(desired)
    candidate = base
    counter = 2
    while True:
        stmt = select(BlogPost.id).where(BlogPost.slug == candidate)
        if exclude_id is not None:
            stmt = stmt.where(BlogPost.id != exclude_id)
        exists = await db.scalar(stmt)
        if not exists:
            return candidate
        suffix = f"-{counter}"
        candidate = f"{base[:240-len(suffix)]}{suffix}"
        counter += 1


def estimate_read_time(html: str) -> int:
    text = re.sub(r"<[^>]+>", " ", html or "")
    text = re.sub(r"\s+", " ", text).strip()
    words = 0 if not text else len(text.split(" "))
    return max(1, round(words / 220))
