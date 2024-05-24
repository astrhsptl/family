from uuid import UUID

from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column

from ._base import Model


class User(Model):
    __tablename__ = "user"

    first_name: Mapped[str] = mapped_column(nullable=False)
    last_name: Mapped[str] = mapped_column(nullable=False)
    email: Mapped[str] = mapped_column(nullable=False)
    password: Mapped[str] = mapped_column(nullable=False)

    family_id: Mapped[UUID | None] = mapped_column(
        ForeignKey("family.id", ondelete="SET NULL"),
        default=None,
        nullable=True,
    )
