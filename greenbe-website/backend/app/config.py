from functools import lru_cache

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    environment: str = "development"
    database_url: str = "sqlite+aiosqlite:///./greenbe.db"
    frontend_origins: str = "http://localhost:5173,http://127.0.0.1:5173"
    auto_create_tables: bool = True

    # No predictable signing key or admin account is created by default.
    jwt_secret: str = ""
    access_token_expire_minutes: int = 720
    admin_seed_email: str = ""
    admin_seed_password: str = ""
    admin_seed_name: str = "GreenBe Admin"

    supabase_url: str | None = None
    supabase_service_role_key: str | None = None
    supabase_storage_bucket: str = "blog-media"

    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")

    @property
    def cors_origins(self) -> list[str]:
        """Return exact allowed browser origins with duplicates removed."""
        return list(dict.fromkeys(
            item.strip().rstrip("/")
            for item in self.frontend_origins.split(",")
            if item.strip()
        ))

    @property
    def async_database_url(self) -> str:
        url = self.database_url.strip()
        if url.startswith(("postgresql+asyncpg://", "sqlite+aiosqlite://")):
            return url
        if url.startswith("postgresql://"):
            return url.replace("postgresql://", "postgresql+asyncpg://", 1)
        if url.startswith("postgres://"):
            return url.replace("postgres://", "postgresql+asyncpg://", 1)
        return url

    def validate_runtime(self) -> None:
        """Catch insecure settings at startup, before accepting API traffic."""
        if len(self.jwt_secret) < 32:
            raise RuntimeError("Set JWT_SECRET to a randomly generated string of at least 32 characters in .env.")
        if bool(self.admin_seed_email) != bool(self.admin_seed_password):
            raise RuntimeError("Set both ADMIN_SEED_EMAIL and ADMIN_SEED_PASSWORD, or leave both empty.")
        if self.admin_seed_password and len(self.admin_seed_password) < 12:
            raise RuntimeError("ADMIN_SEED_PASSWORD must be at least 12 characters long.")
        if self.environment.lower() == "production" and not self.cors_origins:
            raise RuntimeError("Set FRONTEND_ORIGINS to your HTTPS frontend domain(s) in production.")


@lru_cache
def get_settings() -> Settings:
    return Settings()
