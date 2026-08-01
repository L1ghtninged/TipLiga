import os

class Config:
    JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY")
    JWT_ACCESS_TOKEN_EXPIRES = 60 * 60 * 24 * 7  # 7 dní

    USER_PASSWORD = os.getenv("USER_PASSWORD")
    ADMIN_PASSWORD = os.getenv("ADMIN_PASSWORD")