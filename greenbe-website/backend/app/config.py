from functools import lru_cache

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    environment: str = "development"
    database_url: str = "sqlite+aiosqlite:///./greenbe.db"
    frontend_origins: str = "http://localhost:5173"
    auto_create_tables: bool = True

    jwt_secret: str = "change-me-in-production"
    access_token_expire_minutes: int = 720
    admin_seed_email: str = "admin@greenbe.org"
    admin_seed_password: str = "change-me-now"
    admin_seed_name: str = "GreenBe Admin"

    supabase_url: str | None = None
    supabase_service_role_key: str | None = None
    supabase_storage_bucket: str = "blog-media"

    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")

    @property
    def cors_origins(self) -> list[str]:
        return [item.strip() for item in self.frontend_origins.split(",") if item.strip()]

    @property
    def async_database_url(self) -> str:
        url = self.database_url.strip()
        if url.startswith("postgresql+asyncpg://") or url.startswith("sqlite+aiosqlite://"):
            return url
        if url.startswith("postgresql://"):
            return url.replace("postgresql://", "postgresql+asyncpg://", 1)
        if url.startswith("postgres://"):
            return url.replace("postgres://", "postgresql+asyncpg://", 1)
        return url


@lru_cache
def get_settings() -> Settings:
    return Settings()
