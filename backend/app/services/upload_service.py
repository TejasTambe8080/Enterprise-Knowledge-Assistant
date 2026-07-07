from __future__ import annotations

from pathlib import Path

from fastapi import UploadFile
from sqlalchemy.orm import Session

from ..config import config
from ..models.document import Document
from ..utils.file_handler import allowed_file, ensure_directory, save_upload_file
from ..schemas.upload_schema import UploadResponse


class UploadService:
    def __init__(self, db: Session):
        self.db = db

    def save_document(self, file: UploadFile, user_id: int) -> UploadResponse:
        if not allowed_file(file.filename):
            raise ValueError("Unsupported file type")

        upload_dir = ensure_directory(config.upload_dir)
        saved_path = save_upload_file(file, upload_dir)
        document = Document(user_id=user_id, file_name=file.filename, file_path=str(saved_path), chunks=0)
        self.db.add(document)
        self.db.commit()
        self.db.refresh(document)
        return UploadResponse(filename=file.filename, file_path=str(saved_path), chunks=0)
