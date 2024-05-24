from app.schemas import FamilyCreate, FamilyRead, FamilyUpdate
from app.service import FamilyService
from fastapi import APIRouter

from ._base import Controller


class FamilyController(Controller):
    read_model = FamilyRead
    create_model = FamilyCreate
    update_model = FamilyUpdate
    service = FamilyService


family_controller_instance = FamilyController(prefix="/family", tags=["Family"])
family_controller: APIRouter = family_controller_instance.build()
