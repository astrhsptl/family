from domain.models import Event

from ._base import BaseRepository


class EventRepository(BaseRepository):
    model = Event
