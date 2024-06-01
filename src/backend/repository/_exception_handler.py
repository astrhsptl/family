import re


class RepositoryExceptionHandler:
    def __init__(self):
        self.exception_marks = {
            "duplicate key value violates unique constraint": self.__validate_duplicate
        }

    def validate(self, exc: str, data: dict):
        for mark in self.exception_marks.keys():
            if mark not in exc:
                continue

            field = self.exception_marks[mark](exc)
            value = data.get(field)

            return f"{field} with value {value} already exist".capitalize()

    def __validate_duplicate(self, exc: str):
        field = re.search(r"\(\w+\)", exc)
        field = re.sub(r"\W", "", field.group())
        return field
