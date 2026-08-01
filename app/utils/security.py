# app/security.py

from functools import wraps
from app.routes.exceptions import *

from flask import jsonify
from flask_jwt_extended import (
    jwt_required,
    get_jwt,
    get_jwt_identity,
    
)


def role_required(*allowed_roles):
    """
    Povolí přístup pouze uživatelům s danou rolí.
    """

    def decorator(fn):

        @wraps(fn)
        @jwt_required()
        def wrapper(*args, **kwargs):

            role = get_jwt().get("role")

            if role not in allowed_roles:
                return jsonify({
                    "message": "Nemáte oprávnění."
                }), 403

            return fn(*args, **kwargs)

        return wrapper

    return decorator


def admin_required(fn):
    """
    Přístup pouze pro administrátora.
    """
    return role_required("admin")(fn)


def current_user_id():
    return int(get_jwt_identity())


def current_role():
    return get_jwt().get("role")
def ensure_owner(owner_id: int):
    """
    Ověří, že přihlášený uživatel je vlastníkem objektu.
    """
    if owner_id != current_user_id():
        raise ForbiddenException("Nemáte oprávnění.")