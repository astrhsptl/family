from app.schemas.auth import (
    OAUTH2_SCHEMA,
    AccessToken,
    AuthenticationSchema,
    RefreshToken,
    RegistrationSchema,
)
from backend.app.schemas.auth import TokenPair
from backend.app.schemas.user import UserRead
from backend.app.service.auth import AuthService
from backend.domain.structures.paginated_result import ErrorResponse
from fastapi import APIRouter, Depends, HTTPException

controller = APIRouter(prefix="/auth", tags=["Auth"])
service = AuthService()


@controller.post(
    "/sign-in",
    response_model=TokenPair,
)
async def authenticate(data: AuthenticationSchema) -> TokenPair:
    data = await service.authenticate(data=data)

    if isinstance(data, (ErrorResponse,)):
        raise HTTPException(data.status_code, data.detail)

    return data


async def registration(data: RegistrationSchema) -> UserRead:
    data = await service.registration(data=data)

    if isinstance(data, (ErrorResponse,)):
        raise HTTPException(data.status_code, data.detail)

    return data


async def refresh(data: RefreshToken) -> AccessToken:
    data = await service.refresh(data=data)

    if isinstance(data, (ErrorResponse,)):
        raise HTTPException(data.status_code, data.detail)

    return data


async def user_by_token(self, token: str | Depends(OAUTH2_SCHEMA)):
    data = await service.user_by_token(AccessToken(access=token))

    if isinstance(data, (ErrorResponse,)):
        raise HTTPException(data.status_code, data.detail)

    return data
