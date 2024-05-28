from datetime import timedelta
from os import getenv as env

from dotenv import load_dotenv

load_dotenv()

SECRET_KEY = env("SECRET_KEY")

ACCESS_EXPIRES_TIME = timedelta(hours=48)
REFRESH_EXPIRES_TIME = timedelta(days=7)

ALGORITHM = "HS256"


# Token sign: id, type, exp,
