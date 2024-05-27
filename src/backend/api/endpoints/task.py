from app.schemas import TaskCreate, TaskRead, TaskUpdate
from app.service import TaskService

from ._base import Controller


class TaskController(Controller):
    read_model = TaskRead
    create_model = TaskCreate
    update_model = TaskUpdate
    service = TaskService()


task_api = TaskController("/task", ["Task"])
task_controller = task_api.build()
