import mimetypes
from functools import lru_cache
from pathlib import Path
from uuid import uuid4

from fastapi import HTTPException, UploadFile, status
from starlette.concurrency import run_in_threadpool
from supabase import Client, create_client

from .config import get_settings


settings = get_settings()

ALLOWED_IMAGE_TYPES = {
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/gif",
}

MAX_UPLOAD_BYTES = 6 * 1024 * 1024

# Avoid checking/creating the bucket on every upload.
_bucket_ready = False


@lru_cache(maxsize=1)
def get_supabase() -> Client:
    """
    Create the Supabase client only once and reuse it.
    """

    if (
        not settings.supabase_url
        or not settings.supabase_service_role_key
    ):
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Supabase Storage is not configured on the backend.",
        )

    return create_client(
        settings.supabase_url,
        settings.supabase_service_role_key,
    )


def ensure_public_bucket(client: Client) -> None:
    """
    Ensure the configured bucket exists.

    This check is performed only once for the lifetime
    of the FastAPI process.
    """

    global _bucket_ready

    if _bucket_ready:
        return

    bucket_name = settings.supabase_storage_bucket

    try:
        client.storage.get_bucket(bucket_name)

    except Exception:
        try:
            client.storage.create_bucket(
                bucket_name,
                options={
                    "public": True,
                    "allowed_mime_types": sorted(
                        ALLOWED_IMAGE_TYPES
                    ),
                    "file_size_limit": MAX_UPLOAD_BYTES,
                },
            )

        except Exception as exc:
            raise HTTPException(
                status_code=502,
                detail=f"Could not access or create storage bucket: {exc}",
            ) from exc

    _bucket_ready = True


def _upload_bytes(
    data: bytes,
    content_type: str,
    object_path: str,
) -> tuple[str, str]:
    """
    Perform the synchronous Supabase Storage call.

    This function is executed inside FastAPI's thread pool
    so it does not block the async event loop.
    """

    client = get_supabase()

    ensure_public_bucket(client)

    bucket = client.storage.from_(
        settings.supabase_storage_bucket
    )

    bucket.upload(
        path=object_path,

        # Important:
        # use RAW bytes, not BytesIO.
        file=data,

        file_options={
            "content-type": content_type,
            "cache-control": "31536000",
            "upsert": "false",
        },
    )

    public_url = bucket.get_public_url(
        object_path
    )

    if isinstance(public_url, str):
        url = public_url

    elif isinstance(public_url, dict):
        url = (
            public_url.get("publicUrl")
            or public_url.get("public_url")
            or ""
        )

    else:
        url = (
            getattr(
                public_url,
                "public_url",
                "",
            )
            or str(public_url)
        )

    if not url:
        raise HTTPException(
            status_code=502,
            detail=(
                "Storage upload completed but "
                "no public URL was returned."
            ),
        )

    return url, object_path


async def upload_image(
    file: UploadFile,
    folder: str = "articles",
) -> tuple[str, str]:
    """
    Validate and upload an image to Supabase Storage.
    """

    content_type = (
        file.content_type or ""
    ).lower()

    if content_type not in ALLOWED_IMAGE_TYPES:
        raise HTTPException(
            status_code=415,
            detail=(
                "Only JPG, PNG, WebP and GIF "
                "images are allowed."
            ),
        )

    # Read at most 1 byte over the allowed limit.
    data = await file.read(
        MAX_UPLOAD_BYTES + 1
    )

    if len(data) > MAX_UPLOAD_BYTES:
        raise HTTPException(
            status_code=413,
            detail="Image must be 6 MB or smaller.",
        )

    if not data:
        raise HTTPException(
            status_code=400,
            detail="Uploaded image is empty.",
        )

    extension = Path(
        file.filename or "image"
    ).suffix.lower()

    if not extension:
        extension = (
            mimetypes.guess_extension(
                content_type
            )
            or ".jpg"
        )

    allowed_extensions = {
        ".jpg",
        ".jpeg",
        ".png",
        ".webp",
        ".gif",
    }

    safe_ext = (
        extension
        if extension in allowed_extensions
        else ".jpg"
    )

    # Prevent arbitrary folder paths.
    safe_folder = (
        folder.strip("/")
        .replace("..", "")
        or "articles"
    )

    object_path = (
        f"{safe_folder}/"
        f"{uuid4().hex}"
        f"{safe_ext}"
    )

    try:
        # Supabase Python storage calls are synchronous.
        # Run them outside the main async event loop.
        return await run_in_threadpool(
            _upload_bytes,
            data,
            content_type,
            object_path,
        )

    except HTTPException:
        raise

    except Exception as exc:
        raise HTTPException(
            status_code=502,
            detail=f"Storage upload failed: {exc}",
        ) from exc