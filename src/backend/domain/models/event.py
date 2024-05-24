
from datetime import datetime
from uuid import UUID

from sqlalchemy import DateTime, ForeignKey, func
from sqlalchemy.orm import Mapped, mapped_column

from ._base import Model


class Event(Model):
    __tablename__ = "event"

    title: Mapped[str] = mapped_column(nullable=False)
    description: Mapped[str | None] = mapped_column(nullable=True, default=None)
    created_date: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now()
    )
    finish_date: Mapped[datetime] = mapped_column(nullable=True, default=None)
    user_id: Mapped[UUID | None] = mapped_column(
        ForeignKey("user.id", ondelete="SET NULL"),
        default=None,
        nullable=True,
    )
    family_id: Mapped[UUID | None] = mapped_column(
        ForeignKey("family.id", ondelete="SET NULL"),
        default=None,
        nullable=True,
    )