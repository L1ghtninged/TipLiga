# app/routes/auth_routes.py
from flask import Blueprint, request, jsonify
from app.services.auth_service import AuthService

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

