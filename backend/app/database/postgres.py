from .connection import Base, engine


def init_postgres() -> None:
    Base.metadata.create_all(bind=engine)
