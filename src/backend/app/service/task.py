from repository import TaskRepository

from app.schemas import TaskRead

from ._base import BaseService


class TaskService(BaseService):
    _repository = TaskRepository()
    _data_serializer = TaskRead
