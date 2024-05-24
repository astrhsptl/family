from app.schemas import UserCreate, UserRead, UserUpdate
from app.service import UserService
from fastapi import APIRouter

from ._base import Controller


class UserController(Controller):
    read_model = UserRead
    create_model = UserCreate
    update_model = UserUpdate
    service = UserService


user_controller_instance = UserController(prefix="/user", tags=["User"])
user_controller: APIRouter = user_controller_instance.build()
