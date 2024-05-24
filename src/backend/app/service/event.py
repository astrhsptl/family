from repository import EventRepository

from app.schemas import EventRead

from .BaseService import BaseService


class EventService(BaseService):
    _repository = EventRepository()
    _data_serializer = EventRead
