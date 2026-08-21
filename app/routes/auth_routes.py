from flask import Blueprint, request, jsonify
from flask_jwt_extended import get_jwt, jwt_required

from app.services.auth_service import AuthService
from app.utils.security import current_user_id
from app.extensions.limiter import limiter
from config import Config
from flask import current_app

auth_bp = Blueprint(
    "auth",
    __name__,
    url_prefix="/api/auth"
)


@auth_bp.route("/login", methods=["POST"])
@limiter.limit(Config.RATELIMIT_LOGIN)
def login():

    data = request.get_json()

    if not data:
        return jsonify({
            "error": "Chybí data požadavku."
        }), 400

    uzivatel_id = data.get("uzivatel_id")
    heslo = data.get("heslo")

    if uzivatel_id is None or heslo is None:
        return jsonify({
            "error": "Chybí přihlašovací údaje."
        }), 400

    vysledek = AuthService.login(
        uzivatel_id=uzivatel_id,
        heslo=heslo
    )

    if vysledek is None:

        current_app.logger.warning(
            "Neúspěšný login uživatele ID %s z IP %s.",
            uzivatel_id,
            request.remote_addr
        )

        return jsonify({
            "error": "Neplatné přihlašovací údaje."
        }), 401

    current_app.logger.info(
        "Uživatel ID %s se úspěšně přihlásil z IP %s.",
        uzivatel_id,
        request.remote_addr
    )

    return jsonify({
        "access_token": vysledek["token"]
    }), 200


@auth_bp.route("/admin/login", methods=["POST"])
@limiter.limit(Config.RATELIMIT_LOGIN)
def login_admin():

    data = request.get_json()

    if not data:
        return jsonify({
            "error": "Chybí data požadavku."
        }), 400

    heslo = data.get("heslo")

    if heslo is None:
        return jsonify({
            "error": "Chybí heslo."
        }), 400

    vysledek = AuthService.login_admin(
        heslo=heslo
    )

    if vysledek is None:

        current_app.logger.warning(
            "Neúspěšný pokus o přihlášení administrátora z IP %s.",
            request.remote_addr
        )

        return jsonify({
            "error": "Neplatné heslo."
        }), 401

    current_app.logger.info(
        "Administrátor se úspěšně přihlásil z IP %s.",
        request.remote_addr
    )

    return jsonify({
        "access_token": vysledek["token"]
    }), 200


@auth_bp.route("/users", methods=["GET"])
def get_users():

    users = AuthService.get_users()

    return jsonify([
        {
            "username": user.username,
            "id": user.id
        }
        for user in users
    ]), 200


@auth_bp.route("/me", methods=["GET"])
@jwt_required()
def get_me():

    user_id = current_user_id()

    user = AuthService.get_user_by_id(user_id)

    if user is None:
        return jsonify({
            "error": "Uživatel nenalezen."
        }), 404

    return jsonify({
        "id": user.id,
        "username": user.username
    }), 200


@auth_bp.route("/admin/me", methods=["GET"])
@jwt_required()
def get_admin_me():

    claims = get_jwt()

    if claims.get("role") != "admin":

        current_app.logger.warning(
            "Uživatel ID %s se pokusil přistoupit k admin endpointu.",
            current_user_id()
        )

        return jsonify({
            "error": "Admin access required."
        }), 403

    return jsonify({
        "role": "admin"
    }), 200