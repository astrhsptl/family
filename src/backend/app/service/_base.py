from math import ceil
from uuid import UUID

from domain.structures.paginated_result import (
    ErrorResponse,
    PaginatedResponse,
    SuccessResponse,
)
from fastapi import Request
from pydantic import BaseModel
from repository._base import BaseRepository


class BaseService:
    _repository: BaseRepository
    _data_serializer: BaseModel

    async def get_all(
        self,
        request: Request,
        page: int = 1,
        quantity: int = 50,
        order_by: str | None = None,
    ) -> PaginatedResponse | None:
        result = await self._repository.get_all(page, quantity, order_by)

        if result.detail:
            return ErrorResponse(detail=result.detail, status_code=result.status_code)

        return self._paginate(request, result.count, result.data, page, quantity)

    async def get_by_id(self, id: str | UUID):
        result = await self._repository.get_by_id(id)

        if result.detail:
            return ErrorResponse(detail=result.detail, status_code=result.status_code)

        return self._data_serializer.model_validate(result.data)

    async def create(self, data: dict):
        result = await self._repository.create(data)

        if result.detail:
            return ErrorResponse(detail=result.detail, status_code=result.status_code)

        return self._data_serializer.model_validate(result.data)

    async def update(self, id: str | UUID, data: dict):
        result = await self._repository.update(id, data)

        if result.detail:
            return ErrorResponse(detail=result.detail, status_code=result.status_code)

        return self._data_serializer.model_validate(result.data)

    async def delete(self, id: str | UUID):
        result = await self._repository.delete(id)

        if result.detail:
            return ErrorResponse(detail=result.detail, status_code=result.status_code)

        return SuccessResponse(result.data, result.status_code)

    def _paginate(self, request: Request, count: int, data, page: int, quantity: int):
        page = max(page, 1)
        url = request.url
        base_url = f"{url.scheme}://{url.netloc}{url.path}"
        next_page = (
            f"{base_url}?page={page + 1}&quantity={quantity}"
            if count > page * quantity
            else None
        )
        prev_page = (
            f"{base_url}?page={page - 1}&quantity={quantity}" if page > 1 else None
        )
        pages = ceil(count / quantity)

        return PaginatedResponse[self._data_serializer](
            data, next_page, prev_page, pages
        )
