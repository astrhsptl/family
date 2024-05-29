from typing import Annotated

from domain.structures.paginated_result import ErrorResponse
from fastapi import Depends, HTTPException
from repository import UserRepository

from app.schemas import UserRead
from app.schemas.auth import (
    OAUTH2_SCHEMA,
    AccessToken,
    AuthenticationSchema,
    RefreshToken,
    RegistrationSchema,
    TokenPair,
    TokenPayload,
)

from ._base import BaseService
from .tlib import TLib


class AuthService(BaseService):
    _repository = UserRepository()
    _data_serializer = UserRead
    _tlib = TLib()

    async def authenticate(
        self, data: AuthenticationSchema
    ) -> ErrorResponse | TokenPair:
        user = (await self._repository.get_by_condition(email=data.email)).data

        if not user:
            return ErrorResponse(
                detail=f"No user with email {data.email}",
                status_code=401,
            )
        if not self._tlib.verify_password(data.password, user.password):
            return ErrorResponse(
                detail="Incorrect Password",
                status_code=401,
            )

        tokens = self._tlib.create_token_pair(TokenPayload(id=str(user.id)))
        return tokens

    async def registration(self, data: RegistrationSchema):
        data.password = self._tlib.create_password_hash(data.password)
        return await self.create(data.model_dump(exclude_unset=True))

    async def refresh(self, data: RefreshToken):
        result = self._tlib.decode_token(data.refresh)

        if result.data.get("type") == self._tlib.access_type:
            return ErrorResponse(detail="Must be refresh token", status_code=401)

        if result.detail:
            return ErrorResponse(detail=result.detail, status_code=result.status_code)

        token_data = TokenPayload(id=result.data.get("sub"))

        return AccessToken(access=self._tlib._create_access_token(token_data))

    async def user_by_token(self, data: AccessToken):
        result = self._tlib.decode_token(data.access)

        if result.detail:
            return ErrorResponse(detail=result.detail, status_code=result.status_code)

        if result.data.get("type") == self._tlib.refresh_type:
            return ErrorResponse(detail="Must be access token", status_code=401)

        return await self.get_by_id(result.data.get("sub"))


def check_auth(token: Annotated[str, Depends(OAUTH2_SCHEMA)]):
    _tlib = TLib()
    result = _tlib.decode_token(token)

    if result.detail:
        raise HTTPException(detail=result.detail, status_code=result.status_code)

    if result.data.get("type") == _tlib.refresh_type:
        raise HTTPException(detail="Must be access token", status_code=401)

    return AccessToken(access=result.data.get("sub"))


auth_dependency = Depends(check_auth)
