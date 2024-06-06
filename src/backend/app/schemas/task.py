from datetime import datetime
from uuid import UUID

from pydantic import BaseModel, Field

from ._base import Model


class TaskRead(Model):
    title: str
    description: str | None
    created_date: datetime | None
    finish_date: datetime | None
    is_finished: bool
    user_id: UUID | None
    family_id: UUID | None
    event_id: UUID | None


class TaskCreate(BaseModel):
    title: str
    description: str | None = Field(None)
    created_date: datetime | None = Field(None)
    finish_date: datetime | None = Field(None)
    is_finished: bool | None = Field(None)
    user_id: UUID | None = Field(None)
    family_id: UUID | None = Field(None)
    event_id: UUID | None = Field(None)


class TaskUpdate(BaseModel):
    title: str | None = Field(None)
    description: str | None = Field(None)
    finish_date: datetime | None = Field(None)
    is_finished: bool | None = Field(None)
    user_id: UUID | None = Field(None)
    family_id: UUID | None = Field(None)
    event_id: UUID | None = Field(None)
