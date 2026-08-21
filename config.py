import os
from datetime import timedelta

from dotenv import load_dotenv

load_dotenv()


class Config:

    JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY")

    if not JWT_SECRET_KEY:
        raise RuntimeError(
            "JWT_SECRET_KEY is not configured."
        )

    JWT_ACCESS_TOKEN_EXPIRES = timedelta(seconds=int(os.getenv("JWT_ACCESS_TOKEN_EXPIRES", 3600)))
    JWT_ADMIN_TOKEN_EXPIRES = timedelta(seconds=int(os.getenv("JWT_ADMIN_TOKEN_EXPIRES", 1800)))
    JWT_TOKEN_LOCATION = ["headers"]
    RATELIMIT_DEFAULT = os.getenv("RATELIMIT_DEFAULT")
    RATELIMIT_LOGIN = os.getenv("RATELIMIT_LOGIN")
    RATELIMIT_STORAGE_URI = os.getenv("RATELIMIT_STORAGE_URI","memory://")

    DATABASE_HOST = os.getenv("DATABASE_HOST")
    DATABASE_PORT = int(os.getenv("DATABASE_PORT", 3306))
    DATABASE_USER = os.getenv("DATABASE_USER")
    DATABASE_PASSWORD = os.getenv("DATABASE_PASSWORD")
    DATABASE_NAME = os.getenv("DATABASE_NAME")

    DB_POOL_NAME = os.getenv(
        "DB_POOL_NAME",
        "tipovacka_pool"
    )

    DB_POOL_SIZE = int(
        os.getenv("DB_POOL_SIZE", 5)
    )

    FRONTEND_ORIGIN = os.getenv("FRONTEND_ORIGIN")
    ADMIN_PASSWORD = os.getenv("ADMIN_PASSWORD")

    if not ADMIN_PASSWORD:
        raise RuntimeError(
            "ADMIN_PASSWORD is not configured."
        )