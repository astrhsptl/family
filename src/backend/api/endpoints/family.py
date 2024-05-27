from app.schemas import FamilyCreate, FamilyRead, FamilyUpdate
from app.service import FamilyService

from ._base import Controller


class FamilyController(Controller):
    read_model = FamilyRead
    create_model = FamilyCreate
    update_model = FamilyUpdate
    service = FamilyService()


family_api = FamilyController("/family", tags=["Family"])
family_controller = family_api.build()
