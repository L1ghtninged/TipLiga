from flask import current_app
from flask_jwt_extended import create_access_token

from app.dao.uzivatel_dao import UzivatelDAO
from werkzeug.security import check_password_hash
from config import Config

class AuthService:

    @staticmethod
    def login(uzivatel_id: int, heslo: str):

        uzivatel = UzivatelDAO.get_by_id(uzivatel_id)

        if uzivatel is None:
            return None
        password_hash = UzivatelDAO.get_password_hash(uzivatel_id)
        if password_hash is None:
            return None
        if not check_password_hash(password_hash, heslo):
            return None

        token = create_access_token(
            identity=str(uzivatel.id),
            additional_claims={
                "role": "user"
            },
            expires_delta=Config.JWT_ACCESS_TOKEN_EXPIRES
        )

        return {
            "token": token,
            "uzivatel": uzivatel
        }

    @staticmethod
    def login_admin(heslo: str):

        if heslo != current_app.config["ADMIN_PASSWORD"]:
            return None

        token = create_access_token(
            identity="admin",
            additional_claims={
                "role": "admin"
            },
            expires_delta=Config.JWT_ADMIN_TOKEN_EXPIRES
        )

        return {
            "token": token
        }
    @staticmethod
    def get_users():
        users = UzivatelDAO.get_all()
        return users
    @staticmethod
    def get_user_by_id(user_id: int):
        user = UzivatelDAO.get_by_id(user_id)
        return user
    
    