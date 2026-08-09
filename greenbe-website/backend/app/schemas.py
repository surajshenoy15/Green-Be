from datetime import datetime
from typing import Any, Literal

from pydantic import BaseModel, ConfigDict, EmailStr, Field, field_validator


class AdminPublic(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: int
    email: EmailStr
    full_name: str


class LoginRequest(BaseModel):
    email: EmailStr
    password: str = Field(min_length=1, max_length=200)


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    admin: AdminPublic


class BlogBase(BaseModel):
    title: str = Field(min_length=1, max_length=220)
    slug: str | None = Field(default=None, max_length=240)
    excerpt: str = Field(default="", max_length=1200)
    category: str = Field(default="Stories", max_length=100)
    author_name: str = Field(default="GreenBe Team", max_length=120)
    author_avatar_url: str | None = None
    thumbnail_url: str | None = None
    content_json: dict[str, Any] = Field(default_factory=dict)
    content_html: str = ""
    tags: list[str] = Field(default_factory=list)
    seo_title: str | None = Field(default=None, max_length=255)
    seo_description: str | None = Field(default=None, max_length=320)
    status: Literal["draft", "published"] = "draft"
    featured: bool = False
    published_at: datetime | None = None

    @field_validator("tags")
    @classmethod
    def clean_tags(cls, value: list[str]) -> list[str]:
        cleaned: list[str] = []
        for tag in value:
            item = tag.strip()[:60]
            if item and item.lower() not in {x.lower() for x in cleaned}:
                cleaned.append(item)
        return cleaned[:20]


class BlogCreate(BlogBase):
    pass


class BlogUpdate(BlogBase):
    pass


class BlogAdmin(BlogBase):
    model_config = ConfigDict(from_attributes=True)
    id: int
    read_time_minutes: int
    created_at: datetime
    updated_at: datetime


class BlogPublic(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: int
    title: str
    slug: str
    excerpt: str
    category: str
    author_name: str
    author_avatar_url: str | None
    thumbnail_url: str | None
    content_json: dict[str, Any]
    content_html: str
    tags: list[str]
    seo_title: str | None
    seo_description: str | None
    featured: bool
    read_time_minutes: int
    published_at: datetime | None
    created_at: datetime
    updated_at: datetime


class BlogListResponse(BaseModel):
    items: list[BlogPublic]
    total: int


class AdminBlogListResponse(BaseModel):
    items: list[BlogAdmin]
    total: int


class BlogStats(BaseModel):
    total: int
    published: int
    drafts: int
    featured: int


class UploadResponse(BaseModel):
    url: str
    path: str
