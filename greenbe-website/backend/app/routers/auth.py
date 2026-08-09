from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession

from ..auth import create_access_token, verify_password
from ..database import get_db
from ..deps import get_current_admin
from ..models import AdminUser
from ..schemas import AdminPublic, LoginRequest, TokenResponse

router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/login", response_model=TokenResponse)
async def login(payload: LoginRequest, db: AsyncSession = Depends(get_db)) -> TokenResponse:
    email = payload.email.strip().lower()
    admin = await db.scalar(select(AdminUser).where(func.lower(AdminUser.email) == email))
    if not admin or not admin.is_active or not verify_password(payload.password, admin.password_hash):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid email or password")
    token = create_access_token(f"admin:{admin.id}")
    return TokenResponse(access_token=token, admin=AdminPublic.model_validate(admin))


@router.get("/me", response_model=AdminPublic)
async def me(admin: AdminUser = Depends(get_current_admin)) -> AdminUser:
    return admin
