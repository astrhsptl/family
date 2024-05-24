from app.schemas import EventCreate, EventRead, EventUpdate
from app.service import EventService
from fastapi import APIRouter

from ._base import Controller


class EventController(Controller):
    read_model = EventRead
    create_model = EventCreate
    update_model = EventUpdate
    service = EventService()


event_controller_instance = EventController(prefix="/event", tags=["Event"])
event_controller: APIRouter = event_controller_instance.build()
