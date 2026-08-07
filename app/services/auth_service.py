# app/services/auth_service.py

from flask import current_app
from flask_jwt_extended import create_access_token

from app.dao.uzivatel_dao import UzivatelDAO


class AuthService:

    @staticmethod
    def login(uzivatel_id: int, heslo: str):

        uzivatel = UzivatelDAO.get_by_id(uzivatel_id)

        if uzivatel is None:
            return None

        if heslo != current_app.config["USER_PASSWORD"]:
            return None

        token = create_access_token(
            identity=str(uzivatel.id),
            additional_claims={
                "role": "user"
            }
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
            }
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