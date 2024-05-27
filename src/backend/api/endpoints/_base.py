from uuid import UUID

from app.service._base import BaseService
from domain.structures.paginated_result import SuccessResponse
from fastapi import APIRouter, Request
from pydantic import BaseModel


class Controller:
    read_model: BaseModel = None
    create_model: BaseModel = None
    update_model: BaseModel = None
    service: BaseService = None

    def __init__(
        self,
        prefix: str,
        tags: list[str] = [],
        dependencies: list[str] = [],
    ):
        # create routes
        self.controller = APIRouter(prefix=prefix, tags=tags)
        self.operation_id = prefix.replace("/", "")
        self.dependencies = dependencies

    def build(self):
        async def __create(data: self.create_model):
            return await self.__create(data.model_dump(exclude_unset=True))

        async def __update(id: UUID, data: self.update_model):
            return await self.__update(id, data.model_dump(exclude_unset=True))

        self.controller.add_api_route(
            "/",
            self.__get,
            methods=["GET"],
            response_model=self.read_model,
            operation_id=f"get_{self.operation_id}",
            dependencies=self.dependencies,
        )
        self.controller.add_api_route(
            "/{entity_id:uuid}/",
            self.__get_by_id,
            methods=["GET"],
            response_model=self.read_model,
            operation_id=f"get_by_id_{self.operation_id}",
        )
        self.controller.add_api_route(
            "/",
            __create,
            methods=["POST"],
            response_model=self.read_model,
            operation_id=f"create_{self.operation_id}",
        )
        self.controller.add_api_route(
            "/{entity_id:uuid}/",
            __update,
            methods=["PATCH"],
            response_model=self.read_model,
            operation_id=f"update_{self.operation_id}",
        )
        self.controller.add_api_route(
            "/{entity_id:uuid}/",
            self.__delete,
            methods=["DELETE"],
            response_model=None,
            operation_id=f"delete_{self.operation_id}",
        )

        return self.controller

    async def __get(
        self,
        request: Request,
        page: int = 1,
        quantity: int = 1000,
        order_by: str | None = None,
    ):
        return await self.service.get_all(
            page=page,
            quantity=quantity,
            request=request,
            order_by=order_by,
        )

    async def __get_by_id(self, id: UUID):
        return await self.service.get_by_id(id=id)

    async def __create(self, data):
        return await self.service.create(data=data)

    async def __update(self, id: UUID, data):
        return await self.service.update(id=id, data=data)

    async def __delete(self, id: UUID) -> SuccessResponse:
        return await self.service.delete(id=id)
