from repository import FamilyRepository

from app.schemas import FamilyRead

from ._base import BaseService


class FamilyService(BaseService):
    _repository = FamilyRepository()
    _data_serializer = FamilyRead
