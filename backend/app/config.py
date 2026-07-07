from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")

    app_name: str = Field(default="Enterprise RAG Assistant", alias="APP_NAME")
    environment: str = Field(default="development", alias="ENVIRONMENT")
    debug: bool = Field(default=False, alias="DEBUG")
    gemini_api_key: str | None = Field(default=None, alias="GEMINI_API_KEY")
    database_url: str | None = Field(default=None, alias="DATABASE_URL")
    secret_key: str = Field(default="change-me-in-production", alias="SECRET_KEY")
    algorithm: str = Field(default="HS256", alias="ALGORITHM")
    access_token_expire_minutes: int = Field(default=30, alias="ACCESS_TOKEN_EXPIRE_MINUTES")
    upload_dir: str = Field(default="./backend/uploads", alias="UPLOAD_DIR")
    vector_db_dir: str = Field(default="./backend/vector_db", alias="VECTOR_DB_DIR")
    log_dir: str = Field(default="./backend/logs", alias="LOG_DIR")
    cors_origins: str = Field(default="*", alias="CORS_ORIGINS")


config = Settings()
