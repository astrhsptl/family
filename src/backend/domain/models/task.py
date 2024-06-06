from datetime import datetime
from uuid import UUID

from sqlalchemy import DateTime, ForeignKey, func
from sqlalchemy.orm import Mapped, mapped_column

from ._base import Model


class Task(Model):
    __tablename__ = "task"

    title: Mapped[str] = mapped_column(nullable=False)
    description: Mapped[str | None] = mapped_column(nullable=True, default=None)
    created_date: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now()
    )
    finish_date: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), nullable=True, default=None
    )
    is_finished: Mapped[bool] = mapped_column(
        default=False,
        nullable=False,
    )
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
    event_id: Mapped[UUID | None] = mapped_column(
        ForeignKey("event.id", ondelete="SET NULL"),
        default=None,
        nullable=True,
    )
