from __future__ import annotations

from datetime import datetime, timedelta

from jose import jwt
from passlib.context import CryptContext
from sqlalchemy import select
from sqlalchemy.orm import Session

from ..config import config
from ..models.user import User, UserRole
from ..schemas.auth_schema import UserCreate

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


class AuthService:
    def __init__(self, db: Session):
        self.db = db

    def get_password_hash(self, password: str) -> str:
        return pwd_context.hash(password)

    def verify_password(self, plain_password: str, hashed_password: str) -> bool:
        return pwd_context.verify(plain_password, hashed_password)

    def register_user(self, user_data: UserCreate) -> User:
        existing_user = self.db.execute(select(User).where(User.email == user_data.email)).scalar_one_or_none()
        if existing_user:
            raise ValueError("User with this email already exists")

        user = User(
            email=user_data.email,
            name=user_data.name,
            hashed_password=self.get_password_hash(user_data.password),
            role=UserRole.USER,
        )
        self.db.add(user)
        self.db.commit()
        self.db.refresh(user)
        return user

    def authenticate_user(self, email: str, password: str):
        user = self.db.execute(select(User).where(User.email == email)).scalar_one_or_none()
        if not user or not self.verify_password(password, user.hashed_password):
            return None
        return user

    def create_access_token(self, data: dict, expires_delta: timedelta | None = None):
        to_encode = data.copy()
        expire = datetime.utcnow() + (expires_delta or timedelta(minutes=15))
        to_encode.update({"exp": expire})
        return jwt.encode(to_encode, config.secret_key, algorithm=config.algorithm)
