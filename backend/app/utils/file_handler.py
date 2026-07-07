from __future__ import annotations

from pathlib import Path

from fastapi import UploadFile


def allowed_file(filename: str) -> bool:
    return Path(filename).suffix.lower() in {".pdf", ".docx", ".txt", ".csv"}


def ensure_directory(path: str) -> Path:
    directory = Path(path)
    directory.mkdir(parents=True, exist_ok=True)
    return directory


def save_upload_file(upload_file: UploadFile, directory: Path) -> Path:
    target = directory / upload_file.filename
    with target.open("wb") as buffer:
        buffer.write(upload_file.file.read())
    return target
