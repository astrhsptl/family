from typing import Self, TypeVar
from uuid import UUID

from app.service.BaseService import BaseService
from domain.structures.paginated_result import (
    ErrorResponse,
    SuccessResponse,
    unique_paginated_model,
)
from fastapi import APIRouter, HTTPException, Request
from pydantic import BaseModel

R = TypeVar("R", bound=BaseModel)
C = TypeVar("C", bound=BaseModel)
U = TypeVar("U", bound=BaseModel)


class Controller:
    read_model: R
    create_model: C
    update_model: U
    service: BaseService

    def __init__(
        self: Self,
        prefix: str | None = None,
        tags: list[str] | None = None,
    ) -> None:
        self.prefix: str = prefix
        self.operation_id: str = prefix.replace("/", "")
        self.controller = APIRouter(prefix=prefix, tags=tags)
        self.dependencies = []

    def build(self) -> APIRouter:
        self.controller.add_api_route(
            "/",
            self.get,
            methods=["GET"],
            response_model=unique_paginated_model(self.read_model),
            operation_id=f"get_{self.operation_id}",
            dependencies=self.dependencies,
        )
        self.controller.add_api_route(
            "/{entity_id:uuid}/",
            self.get_by_id,
            methods=["GET"],
            response_model=self.read_model,
            operation_id=f"get_by_id_{self.operation_id}",
        )
        self.create.__annotations__["data"] = self.create_model
        self.controller.add_api_route(
            "/",
            self.create,
            methods=["POST"],
            response_model=self.read_model,
            operation_id=f"create_{self.operation_id}",
        )
        self.update.__annotations__["data"] = self.update_model
        self.controller.add_api_route(
            "/{entity_id:uuid}/",
            self.update,
            methods=["PATCH"],
            response_model=self.read_model,
            operation_id=f"update_{self.operation_id}",
        )
        self.controller.add_api_route(
            "/{entity_id:uuid}/",
            self.delete,
            methods=["DELETE"],
            response_model=None,
            operation_id=f"delete_{self.operation_id}",
        )
        return self.controller

    async def get(
        self: Self,
        request: Request,
        page: int = 1,
        quantity: int = 1000,
        order_by: str | None = None,
    ):
        data = await self.service.get_all(request, page, quantity, order_by)

        if isinstance(data, ErrorResponse):
            raise HTTPException(data.status_code, data.detail)

        return data

    async def get_by_id(
        self: Self,
        id: UUID,
    ):
        data = await self.service.get_by_id(id=id)

        if isinstance(data, ErrorResponse):
            raise HTTPException(data.status_code, data.detail)

        return data

    async def create(
        self: Self,
        data: C,
    ):
        data = await self.service.create(
            data=data.model_dump(exclude_unset=True),
        )

        if isinstance(data, ErrorResponse):
            raise HTTPException(data.status_code, data.detail)

        return data

    async def update(
        self: Self,
        id: UUID,
        data: U,
    ):
        data = await self.service.update(
            id=id, data=data.model_dump(exclude_unset=True)
        )

        if isinstance(data, ErrorResponse):
            raise HTTPException(data.status_code, data.detail)

        return data

    async def delete(
        self: Self,
        id: UUID,
    ) -> SuccessResponse:
        data = await self.service.delete(
            id=id,
        )

        if isinstance(data, ErrorResponse):
            raise HTTPException(data.status_code, data.detail)

        return data
