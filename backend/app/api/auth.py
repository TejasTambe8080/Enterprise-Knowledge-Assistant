from datetime import timedelta

from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from ..config import config
from ..database.connection import get_db
from ..schemas.auth_schema import Token, UserCreate, UserResponse
from ..services.auth_service import AuthService

router = APIRouter()


@router.post("/register", response_model=UserResponse)
def register(user_data: UserCreate, db: Session = Depends(get_db)):
	auth_service = AuthService(db)
	try:
		return auth_service.register_user(user_data)
	except ValueError as exc:
		raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(exc)) from exc


@router.post("/login", response_model=Token)
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
	auth_service = AuthService(db)
	user = auth_service.authenticate_user(form_data.username, form_data.password)
	if not user:
		raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Incorrect credentials")

	access_token = auth_service.create_access_token(
		{"sub": user.email, "role": user.role.value},
		expires_delta=timedelta(minutes=config.access_token_expire_minutes),
	)
	return {"access_token": access_token, "token_type": "bearer", "user": user}


@router.post("/logout")
def logout():
	return {"message": "Logged out successfully"}
