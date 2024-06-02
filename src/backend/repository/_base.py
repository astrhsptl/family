from uuid import UUID

from domain.database import SESSION
from domain.models._base import Model
from domain.structures import ResultData
from sqlalchemy import Select, delete, func, select, update
from sqlalchemy.exc import DBAPIError, IntegrityError

from ._exception_handler import RepositoryExceptionHandler


class BaseRepository:
    model: Model
    _handler = RepositoryExceptionHandler()

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
                return result.set_result(data, count_result)
        except IntegrityError as e:
            return result.set_error(400, (str(e)))
        except DBAPIError:
            return result.set_error(500, "Database Error")

    async def get_by_condition(self, **kwargs) -> ResultData[Model]:
        result = ResultData[self.model]()
        statement = (
            select(self.model)
            .select_from(self.model)
            .where(
                *[getattr(self.model, key) == value for key, value in kwargs.items()]
            )
        )

        try:
            async with SESSION() as session:
                data = await session.scalar(statement)

                if not data:
                    return result.set_error(404, "Entity not found")

                return result.set_result(data)
        except IntegrityError as e:
            return result.set_error(400, (str(e)))
        except DBAPIError:
            return result.set_error(500, "Database Error")

    async def create(self, data: dict) -> ResultData[Model]:
        result = ResultData[Model]()
        entity = self.model(**data)

        try:
            async with SESSION() as session:
                session.add(entity)
                await session.commit()
                await session.refresh(entity)
                return result.set_result(entity)
        except IntegrityError as e:
            handled_string = self._handler.validate(str(e.orig), data)

            if handled_string:
                return result.set_error(400, handled_string)

            return result.set_error(400, (str(e)))
        except DBAPIError:
            return result.set_error(500, "Database Error")

    async def update(self, id: str | UUID, data: dict) -> ResultData[Model]:
        if len(data.keys()) == 0:
            return await self.get_by_condition(id=str(id))

        result = ResultData[Model]()
        try:
            async with SESSION() as session:
                statement = (
                    update(self.model)
                    .values(**data)
                    .where(self.model.id == str(id))
                    .returning(self.model)
                )
                entity = (await session.execute(statement)).unique().scalar()
                return result.set_result(self.model(**entity.as_dict()))
        except IntegrityError as e:
            return result.set_error(400, (str(e)))
        except DBAPIError:
            return result.set_error(500, "Database Error")

    async def delete(self, id: str | UUID) -> ResultData[str]:
        result = ResultData[str]()
        statement = delete(self.model).where(self.model.id == id)

        try:
            async with SESSION() as session:
                await session.scalar(statement)
                return result.set_result("Entity success deleted")
        except IntegrityError as e:
            return result.set_error(400, (str(e)))
        except DBAPIError:
            return result.set_error(500, "Database Error")

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
