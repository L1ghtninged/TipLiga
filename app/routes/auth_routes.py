# app/routes/auth_routes.py
from flask import Blueprint, request, jsonify

auth_bp = Blueprint('auth', __name__, url_prefix='/api/auth')

SHARED_PASSWORD = "fotbal2026"
ADMIN_PASSWORD = "supertajnyadmin123"


@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.json
    entered_password = data.get('password')

    if entered_password == SHARED_PASSWORD:
        # Heslo je správné, vytáhneme z DB seznam uživatelů pro React
        # uzivatele = UzivatelDAO.get_all()
        seznam_uzivatelu = [{"id": 1, "username": "Honza"}, {"id": 2, "username": "Petr"}]
        return jsonify({"status": "user_auth", "users": seznam_uzivatelu}), 200

    elif entered_password == ADMIN_PASSWORD:
        # Bylo zadáno admin heslo
        return jsonify({"status": "admin_auth", "token": "generovany-admin-token-XYZ"}), 200

    else:
        return jsonify({"status": "error", "message": "Nesprávné heslo!"}), 401