from uuid import UUID

from pydantic import BaseModel, Field

from ._base import Model


class TaskRead(Model):
    title: str
    description: str | None
    date: int
    user_id: UUID | None
    family_id: UUID | None
    event_id: UUID | None


class TaskCreate(BaseModel):
    title: str
    description: str | None
    date: int
    user_id: UUID | None
    family_id: UUID | None
    event_id: UUID | None


class TaskUpdate(BaseModel):
    title: str | None = Field(None)
    description: str | None = Field(None)
    date: int | None = Field(None)
    user_id: UUID | None = Field(None)
    family_id: UUID | None = Field(None)
    event_id: UUID | None = Field(None)
