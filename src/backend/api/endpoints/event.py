from app.schemas import EventCreate, EventRead, EventUpdate
from app.service import EventService

from ._base import Controller


class EventController(Controller):
    read_model = EventRead
    create_model = EventCreate
    update_model = EventUpdate
    service = EventService()


event_api = EventController("/event", tags=["Event"])
event_controller = event_api.build()
