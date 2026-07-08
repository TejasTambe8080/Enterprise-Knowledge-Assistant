from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .api import admin, auth, chat, health, upload
from .config import config
from .database.connection import init_db

app = FastAPI(title=config.app_name, version="1.0.0")

app.add_middleware(
	CORSMiddleware,
	allow_origins=["*"],
	allow_credentials=False,
	allow_methods=["*"],
	allow_headers=["*"],
)

app.include_router(health.router, prefix="/api/health", tags=["health"])
app.include_router(auth.router, prefix="/api/auth", tags=["auth"])
app.include_router(upload.router, prefix="/api/upload", tags=["upload"])
app.include_router(chat.router, prefix="/api/chat", tags=["chat"])
app.include_router(admin.router, prefix="/api/admin", tags=["admin"])


@app.on_event("startup")
async def startup_event() -> None:
	await init_db()


@app.get("/")
def root():
	return {"message": config.app_name, "version": "1.0.0", "docs": "/docs"}
