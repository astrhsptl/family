from typing import AsyncIterator
from uuid import UUID

from domain.database import SESSION
from domain.models._base import Model
from domain.structures import ResultData
from sqlalchemy import Select, delete, func, select
from sqlalchemy.exc import DBAPIError, IntegrityError
from sqlalchemy.ext.asyncio import AsyncSession


class BaseRepository:
    model: Model

    async def get_all(
        self, page: int = 1, quantity: int = 50, order_by: str | None = None
    ) -> ResultData[list[Model]]:
        result = ResultData[list[Model]]()
        count = select(func.count(self.model.id)).select_from(self.model)
        statement = (
            select(self.model)
            .select_from(self.model)
            .offset((page - 1) * quantity)
            .limit(quantity)
        )
        statement = self._mutate_statement_by_order(statement, order_by)
        try:
            async with SESSION() as session:
                count_result: int = await session.scalar(count)
                data = (await session.execute(statement)).unique().scalars().all()
                return result.set_result(count_result, data)
        except IntegrityError as e:
            return result.set_error(400, (str(e)))
        except DBAPIError:
            return result.set_error(500, "Database Error")

    async def get_by_id(self, id: str | UUID) -> ResultData[Model]:
        result = ResultData[Model]()
        statement = (
            select(self.model).select_from(self.model).where(self.model.id == id)
        )

        try:
            async with self._session() as session:
                data = await session.scalar(statement)
                return result.set_result(None, data)
        except IntegrityError as e:
            return result.set_error(400, (str(e)))
        except DBAPIError:
            return result.set_error(500, "Database Error")

    async def create(self, data: dict) -> ResultData[Model]:
        result = ResultData[Model]()
        entity = self.model(**data)

        try:
            async with self._session() as session:
                session.add(entity)
                await session.commit()
                await session.refresh(entity)
                return result.set_result(None, entity)
        except IntegrityError as e:
            return result.set_error(400, (str(e)))
        except DBAPIError:
            return result.set_error(500, "Database Error")

    async def update(self, id: str | UUID, data: dict) -> ResultData[Model]:
        result = ResultData[Model]()
        entity = await self.get_by_id(id)

        if not entity.data:
            return result.set_error(404, "Entity not found")

        try:
            async with SESSION() as session:
                for attr_name, attr_value in data.items():
                    setattr(entity.data, attr_name, attr_value)

                await session.commit()
                await session.refresh(entity)
                return result.set_result(None, entity.data)
        except IntegrityError as e:
            return result.set_error(400, (str(e)))
        except DBAPIError:
            return result.set_error(500, "Database Error")

    async def delete(self, id: str | UUID) -> ResultData[str]:
        result = ResultData[str]()
        statement = delete(self.model).where(self.model.id == id)

        try:
            async with self._session() as session:
                await session.scalar(statement)
                return result.set_result(None, "Entity success deleted")
        except IntegrityError as e:
            return result.set_error(400, (str(e)))
        except DBAPIError:
            return result.set_error(500, "Database Error")

    @staticmethod
    async def _session() -> AsyncIterator[AsyncSession]:
        async with SESSION() as session:
            yield session

    def _mutate_statement_by_order(
        self, statement: Select, ordering_column: str | None
    ) -> Select:
        if not ordering_column:
            return statement

        reverse = False

        if ordering_column.startswith("-"):
            reverse = not reverse
            ordering_column = ordering_column.removeprefix("-")

        if not hasattr(self.model, ordering_column):
            return statement

        attribute = getattr(self.model, ordering_column)

        return statement.order_by(attribute.desc() if reverse else attribute.asc())
