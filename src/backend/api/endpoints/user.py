from app.schemas import UserCreate, UserRead, UserUpdate
from app.service import UserService

from ._base import Controller


class UserController(Controller):
    read_model = UserRead
    create_model = UserCreate
    update_model = UserUpdate
    service = UserService()


user_api = UserController("/user", ["User"])
user_controller = user_api.build()
