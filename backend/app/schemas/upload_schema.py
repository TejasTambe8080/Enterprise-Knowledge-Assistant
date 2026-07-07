from __future__ import annotations

from pydantic import BaseModel


class UploadResponse(BaseModel):
    filename: str
    file_path: str
    chunks: int
