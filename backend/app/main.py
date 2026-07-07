from pathlib import Path

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse, JSONResponse
from fastapi.staticfiles import StaticFiles

from .api import admin, auth, chat, health, upload
from .config import config
from .database.connection import init_db

app = FastAPI(title=config.app_name, version="1.0.0")
frontend_dist = Path(__file__).resolve().parents[2] / "frontend" / "dist"

app.add_middleware(
	CORSMiddleware,
	allow_origins=["*"],
	allow_credentials=True,
	allow_methods=["*"],
	allow_headers=["*"],
)

app.include_router(health.router, prefix="/api/health", tags=["health"])
app.include_router(auth.router, prefix="/api/auth", tags=["auth"])
app.include_router(upload.router, prefix="/api/upload", tags=["upload"])
app.include_router(chat.router, prefix="/api/chat", tags=["chat"])
app.include_router(admin.router, prefix="/api/admin", tags=["admin"])

if frontend_dist.exists():
	assets_dir = frontend_dist / "assets"
	if assets_dir.exists():
		app.mount("/assets", StaticFiles(directory=str(assets_dir)), name="assets")


@app.on_event("startup")
async def startup_event() -> None:
	await init_db()


@app.get("/")
def root():
	index_file = frontend_dist / "index.html"
	if index_file.exists():
		return FileResponse(index_file)
	return JSONResponse({"message": config.app_name, "version": "1.0.0", "docs": "/docs"})


@app.get("/{full_path:path}")
def spa_fallback(full_path: str):
	if full_path.startswith("api/") or full_path in {"docs", "redoc", "openapi.json"}:
		return JSONResponse({"detail": "Not Found"}, status_code=404)

	index_file = frontend_dist / "index.html"
	requested_file = frontend_dist / full_path
	if requested_file.is_file():
		return FileResponse(requested_file)
	if index_file.exists():
		return FileResponse(index_file)
	return JSONResponse({"detail": "Frontend not built"}, status_code=404)
