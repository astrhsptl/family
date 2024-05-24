from domain.models import User

from ._base import BaseRepository


class UserRepository(BaseRepository):
    model = User
