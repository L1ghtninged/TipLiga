# app/routes/auth_routes.py
from flask import Blueprint, request, jsonify
from flask_jwt_extended import get_jwt, jwt_required
from app.services.auth_service import AuthService
from app.utils.security import current_user_id

auth_bp = Blueprint('auth', __name__, url_prefix='/api/auth')

@auth_bp.route("/login", methods=["POST"])
def login():

    data = request.get_json()

    vysledek = AuthService.login(
        uzivatel_id=data["uzivatel_id"],
        heslo=data["heslo"]
    )

    if vysledek is None:
        return jsonify({
            "error": "Neplatné přihlašovací údaje."
        }), 401

    return jsonify({
        "access_token": vysledek["token"]
    }), 200
@auth_bp.route("/admin/login", methods=["POST"])
def login_admin():

    data = request.get_json()

    vysledek = AuthService.login_admin(
        heslo=data["heslo"]
    )

    if vysledek is None:
        return jsonify({
            "error": "Neplatné heslo."
        }), 401

    return jsonify({
        "access_token": vysledek["token"]
    }), 200
@auth_bp.route("/users", methods=['GET'])
def get_users():
    users = AuthService.get_users()
    return jsonify([
        {
            "username" : user.username,
            "id" : user.id
        } for user in users
        ]), 200
@auth_bp.route("/me", methods=['GET'])
@jwt_required()
def get_me():
    user_id = current_user_id()
    user = AuthService.get_user_by_id(user_id)
    if user is None:
        return jsonify({"error": "Uživatel nenalezen."}), 404
    return jsonify({
        "id": user.id,
        "username": user.username
    }), 200
@auth_bp.route("/admin/me", methods=["GET"])
@jwt_required()
def get_admin_me():

    claims = get_jwt()

    if claims.get("role") != "admin":
        return jsonify({
            "error": "Admin access required."
        }), 403

    return jsonify({
        "role": "admin"
    }), 200


"""
@jwt.expired_token_loader
def expired(jwt_header, jwt_payload):
    return jsonify({"message": "Token vypršel."}), 401


@jwt.unauthorized_loader
def missing(reason):
    return jsonify({"message": "Chybí autorizační token."}), 401


@jwt.invalid_token_loader
def invalid(reason):
    return jsonify({"message": "Neplatný token."}), 401
"""

