from os import getenv as env

from dotenv import load_dotenv
from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker, create_async_engine
from sqlalchemy.ext.declarative import declarative_base

load_dotenv()

SQLALCHEMY_DATABASE_URL = env("DB_LINK")


engine = create_async_engine(SQLALCHEMY_DATABASE_URL)

SESSION: async_sessionmaker = async_sessionmaker(
    engine,
    class_=AsyncSession,
)

BASE = declarative_base()
