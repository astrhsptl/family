from dataclasses import dataclass
from typing import Generic, TypeVar

T = TypeVar("T")


@dataclass
class ResultData(Generic[T]):
    count: int | None = None
    data: T | None = None
    status_code: int | None = None
    detail: str | None = None

    def set_error(self, status_code: int, detail: str):
        self.status_code = status_code
        self.detail = detail

        return self

    @property
    def error(self):
        if not self.status_code or not self.detail:
            return (None, None)

        return (self.status_code, self.detail)

    def set_result(self, count: int | None, data: T):
        self.count = count
        self.data = data

        return self

    @property
    def result(self):
        if not self.count or not self.data:
            return (None, None)

        return (self.count, self.data)
