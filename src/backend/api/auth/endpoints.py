from app.schemas.auth import (
    AccessToken,
    AuthenticationSchema,
    RefreshToken,
    RegistrationSchema,
    TokenPair,
)
from app.schemas.user import UserRead
from app.service import auth_dependency
from app.service.auth import AuthService
from domain.structures.paginated_result import ErrorResponse
from fastapi import APIRouter, HTTPException

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


@controller.post(
    "/sign-up",
    response_model=UserRead,
)
async def registration(data: RegistrationSchema) -> UserRead:
    data = await service.registration(data=data)

    if isinstance(data, (ErrorResponse,)):
        raise HTTPException(data.status_code, data.detail)
    return data


@controller.post(
    "/refresh",
    response_model=AccessToken,
)
async def refresh(data: RefreshToken) -> AccessToken:
    data = await service.refresh(data=data)

    if isinstance(data, (ErrorResponse,)):
        raise HTTPException(data.status_code, data.detail)

    return data


@controller.get(
    "/user",
    response_model=UserRead,
)
async def user_by_token(token: AccessToken = auth_dependency) -> UserRead:
    data = await service.user_by_token(token)

    if isinstance(data, (ErrorResponse,)):
        raise HTTPException(data.status_code, data.detail)

    return data
