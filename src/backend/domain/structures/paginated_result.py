from typing import Generic, TypeVar

from pydantic import BaseModel

T = TypeVar("T")


class PaginatedResponse(BaseModel, Generic[T]):
    data: list[T]
    next_page: str | None
    previous_page: str | None
    pages: int


class SuccessResponse(BaseModel):
    detail: str
    status_code: int


class ErrorResponse(BaseModel):
    detail: str
    status_code: int


def unique_paginated_model(model: BaseModel):
    class PaginatedResponse(BaseModel):
        data: list[model]
        next_page: str | None
        previous_page: str | None
        pages: int

    return PaginatedResponse
