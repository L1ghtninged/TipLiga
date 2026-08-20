from functools import wraps
import logging
from flask import jsonify
from flask_jwt_extended import (
    jwt_required,
    get_jwt,
    get_jwt_identity,
)

from app.routes.exceptions import ForbiddenException
logger = logging.getLogger(__name__) 

def role_required(*allowed_roles):

    def decorator(fn):

        @wraps(fn)
        @jwt_required()
        def wrapper(*args, **kwargs):

            role = get_jwt().get("role")

            if role not in allowed_roles:
                return jsonify({
                    "error": "Nemáte oprávnění."
                }), 403

            return fn(*args, **kwargs)

        return wrapper

    return decorator


def admin_required(fn):
    return role_required("admin")(fn)


def current_role():
    return get_jwt().get("role")


def current_user_id():

    if current_role() != "user":
        raise ForbiddenException(
            "User access required."
        )

    identity = get_jwt_identity()

    try:
        return int(identity)
    except (TypeError, ValueError):
        raise ForbiddenException(
            "Invalid user identity."
        )


def ensure_owner(owner_id: int):

    if owner_id != current_user_id():
        logger.warning(
            "User %s attempted to access object owned by user %s.",
            current_user_id(),
            owner_id
        )
        raise ForbiddenException(
            "Nemáte oprávnění."
        )