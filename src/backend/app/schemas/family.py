from pydantic import BaseModel, Field

from ._base import Model


class FamilyRead(Model):
    last_name: str | None


class FamilyCreate(BaseModel):
    last_name: str | None


class FamilyUpdate(BaseModel):
    last_name: str | None = Field(None)
