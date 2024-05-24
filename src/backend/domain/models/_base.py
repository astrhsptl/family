from uuid import UUID, uuid4

from sqlalchemy.orm import Mapped, mapped_column

from domain import BASE


class Model(BASE):
    __abstract__ = True

    id: Mapped[UUID] = mapped_column(primary_key=True, default=uuid4, unique=True)

    @property
    def identity(self) -> UUID:
        return self.id

    def as_dict(self) -> dict:
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}

    def __str__(self) -> str:
        return str(self.id)
