from fastapi import APIRouter, Depends, File, UploadFile
from sqlalchemy.orm import Session

from ..database.connection import get_db
from ..dependencies import get_current_user
from ..schemas.upload_schema import UploadResponse
from ..services.upload_service import UploadService

router = APIRouter()


@router.post("/document", response_model=UploadResponse)
def upload_document(file: UploadFile = File(...), db: Session = Depends(get_db), current_user=Depends(get_current_user)):
	return UploadService(db).save_document(file, current_user.id)
