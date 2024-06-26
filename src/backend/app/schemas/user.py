from uuid import UUID

from pydantic import BaseModel, Field

from ._base import Model


class UserRead(Model):
    first_name: str
    last_name: str
    email: str
    password: str
    family_id: UUID | None


class UserCreate(BaseModel):
    first_name: str
    last_name: str
    email: str
    password: str
    family_id: UUID | None = Field(None)


class UserUpdate(BaseModel):
    first_name: str | None = Field(None)
    last_name: str | None = Field(None)
    email: str | None = Field(None)
    password: str | None = Field(None)
    family_id: UUID | None = Field(None)
