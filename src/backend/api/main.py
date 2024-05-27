from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .endpoints import (
    event_controller,
    family_controller,
    task_controller,
    user_controller,
)

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins="*",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(event_controller, prefix="/api/v1")
app.include_router(family_controller, prefix="/api/v1")
app.include_router(task_controller, prefix="/api/v1")
app.include_router(user_controller, prefix="/api/v1")
