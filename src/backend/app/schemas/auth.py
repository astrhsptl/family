from uuid import UUID

from fastapi.security import OAuth2PasswordBearer
from pydantic import BaseModel


class AuthenticationSchema(BaseModel):
    email: str
    password: str


class TokenPair(BaseModel):
    access: str
    refresh: str


class RegistrationSchema(BaseModel):
    first_name: str
    last_name: str
    email: str
    password: str
    family_id: UUID | None


class TokenPayload(BaseModel):
    id: str


class RefreshToken(BaseModel):
    refresh: str


class AccessToken(BaseModel):
    access: str


OAUTH2_SCHEMA = OAuth2PasswordBearer(tokenUrl="token")
