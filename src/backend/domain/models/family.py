from sqlalchemy.orm import Mapped, mapped_column

from ._base import Model


class Family(Model):
    __tablename__ = "family"

    last_name: Mapped[str | None] = mapped_column(nullable=True, default=None)
