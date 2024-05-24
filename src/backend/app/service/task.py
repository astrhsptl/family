from repository import TaskRepository

from app.schemas import TaskRead

from .BaseService import BaseService


class TaskService(BaseService):
    _repository = TaskRepository()
    _data_serializer = TaskRead
