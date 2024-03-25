from sqlalchemy import create_engine, Boolean, Column, ForeignKey, Integer, String, engine
from sqlalchemy.orm import sessionmaker, declarative_base, relationship, Session
from dotenv import load_dotenv
import os

load_dotenv("../.env")
DB_CONNECTOR = os.getenv("DB_CONNECTOR")
DB_USER = os.getenv("DB_USER")
DB_PASSWD = os.getenv("DB_PASSWD")
DB_HOST = os.getenv("DB_HOST")
DB_PORT = os.getenv("DB_PORT")
DB_NAME = os.getenv("DB_NAME")
SQLALCHEMY_DATABASE_URL = engine.URL.create(
    drivername=DB_CONNECTOR,
    username=DB_USER,
    password=DB_PASSWD,
    host=DB_HOST,
    port=DB_PORT,
    database=DB_NAME,
)
engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


Base.metadata.create_all(bind=engine)
