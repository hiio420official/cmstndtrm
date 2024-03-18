from sqlalchemy import create_engine, Boolean, Column, ForeignKey, Integer, String
from sqlalchemy.orm import sessionmaker, declarative_base, relationship, Session

SQLALCHEMY_DATABASE_URL = "mariadb+pymysql://ADMIN:ADMIN@121.140.105.132:3307/ADMIN?charset=utf8mb4"

engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()


class User(Base):
    __tablename__ = "USERS"

    id = Column("USER_ID",Integer, primary_key=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    is_active = Column(Boolean, default=True)


def get_user(db: Session):
    v = db.query(User)
    print(v)
    
    return v.all()


if __name__ == '__main__':
    print(engine)
