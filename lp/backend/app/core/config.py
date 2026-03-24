"""Core configuration module — loads environment variables and provides app-wide settings."""

from pydantic_settings import BaseSettings
from typing import List
import os


class Settings(BaseSettings):
    # App
    APP_ENV: str = "development"
    APP_DEBUG: bool = True
    APP_NAME: str = "PyLearn AI"
    APP_VERSION: str = "1.0.0"

    # Database
    DATABASE_URL: str = "sqlite+aiosqlite:///./pylearn.db"

    # JWT
    JWT_SECRET_KEY: str = "dev-secret-change-in-production"
    JWT_ALGORITHM: str = "HS256"
    JWT_EXPIRATION_MINUTES: int = 60

    # AES-256 Encryption
    AES_ENCRYPTION_KEY: str = ""

    # Hugging Face
    HUGGINGFACE_API_TOKEN: str = ""

    # CORS
    CORS_ORIGINS: str = "http://localhost:3000,http://localhost:8081"

    @property
    def cors_origins_list(self) -> List[str]:
        return [origin.strip() for origin in self.CORS_ORIGINS.split(",")]

    class Config:
        env_file = ".env"
        extra = "ignore"


settings = Settings()
