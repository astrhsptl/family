from app.schemas import TaskCreate, TaskRead, TaskUpdate
from app.service import TaskService
from fastapi import APIRouter

from ._base import Controller


class TaskController(Controller):
    read_model = TaskRead
    create_model = TaskCreate
    update_model = TaskUpdate
    service = TaskService


task_controller_instance = TaskController(prefix="/task", tags=["Task"])
task_controller: APIRouter = task_controller_instance.build()
