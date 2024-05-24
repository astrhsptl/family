
from uuid import UUID

from pydantic import BaseModel, Field

from ._base import Model


class EventRead(Model):
    title: str
    description: str | None
    date: str
    user_id: UUID | None
    family_id: UUID | None


class EventCreate(BaseModel):
    title: str
    description: str | None
    date: str
    user_id: UUID | None
    family_id: UUID | None


class EventUpdate(BaseModel):
    title: str | None = Field(None)
    description: str | None = Field(None)
    date: str | None = Field(None)
    user_id: UUID | None = Field(None)
    family_id: UUID | None = Field(None)
