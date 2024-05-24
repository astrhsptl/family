from domain.models import Family

from ._base import BaseRepository


class FamilyRepository(BaseRepository):
    model = Family
