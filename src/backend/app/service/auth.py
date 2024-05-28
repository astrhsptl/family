from backend.app.schemas.auth import TokenPair
from domain.structures.paginated_result import ErrorResponse
from repository import UserRepository

from app.schemas import UserRead
from app.schemas.auth import (
    AccessToken,
    AuthenticationSchema,
    RefreshToken,
    RegistrationSchema,
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

        if not self._tlib.verify_password(user.password, data.password):
            return ErrorResponse(
                detail="Incorrect Password",
                status_code=401,
            )

        return self._tlib.create_token_pair(TokenPayload(id=user.id))

    async def registration(self, data: RegistrationSchema):
        data.password = self._tlib.create_password_hash(data.password)
        return await self.create(data.model_dump(exclude_unset=True))

    async def refresh(self, data: RefreshToken):
        result = self._tlib.decode_token(data.refresh)

        if result.detail:
            return ErrorResponse(detail=result.detail, status_code=result.status_code)

        token_data = result.data
        token_data["type"] = self._tlib.access_type

        return AccessToken(access=self._tlib.__create_access_token(token_data))

    async def user_by_token(self, data: AccessToken):
        result = self._tlib.decode_token(data.refresh)

        if result.detail:
            return ErrorResponse(detail=result.detail, status_code=result.status_code)

        return self.get_by_id(result.data.get("id"))
