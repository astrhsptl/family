from domain.models import Task

from ._base import BaseRepository


class TaskRepository(BaseRepository):
    model = Task
