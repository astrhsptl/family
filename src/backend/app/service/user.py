from repository import UserRepository

from app.schemas import UserRead

from .BaseService import BaseService


class UserService(BaseService):
    _repository = UserRepository()
    _data_serializer = UserRead
