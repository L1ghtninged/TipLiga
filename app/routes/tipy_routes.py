from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required

from app.services.tipy_service import TipyService as service
from app.utils.security import current_user_id

tipy_bp = Blueprint("tipy", __name__, url_prefix="/api")


@tipy_bp.route("/leaderboard", methods=["GET"])
@jwt_required()
def get_leaderboard():
    users = service.leaderboard()
    return jsonify([user.to_dict() for user in users]), 200


@tipy_bp.route("/tips/<int:round_id>", methods=["GET"])
@jwt_required()
def get_tips_for_user(round_id):

    tips = service.get_tips_for_user_and_round(
        current_user_id(),
        round_id
    )

    return jsonify([tip.to_dict() for tip in tips]), 200


@tipy_bp.route("/tips/<int:round_id>", methods=["POST", "PUT"])
@jwt_required()
def save_tip(round_id):

    data = request.get_json()

    tip = service.create_tip(
        current_user_id(),
        round_id,
        data
    )

    if request.method == "POST":
        return jsonify({
            "message": "Tip created",
            "tip": tip.to_dict()
        }), 201

    return jsonify({
        "message": "Tip updated",
        "tip": tip.to_dict()
    }), 200


@tipy_bp.route("/tips/<int:tip_id>", methods=["DELETE"])
@jwt_required()
def delete_tip(tip_id):

    tip = service.delete_tip(
        tip_id
    )

    return jsonify({
        "message": "Tip deleted",
        "tip": tip.to_dict()
    }), 200


@tipy_bp.route("/rounds/<int:round_id>/matches", methods=["GET"])
@jwt_required()
def round_matches(round_id):

    kolo, matches = service.round_matches(round_id)

    return jsonify({
        "round": kolo.to_dict(),
        "matches": [match.to_dict() for match in matches]
    }), 200


@tipy_bp.route("/rounds", methods=["GET"])
@jwt_required()
def get_rounds():

    rounds = service.get_rounds()

    return jsonify([round.to_dict() for round in rounds]), 200


@tipy_bp.route("/joker-status/<int:round_id>", methods=["GET"])
@jwt_required()
def joker_status(round_id):

    used, remaining = service.joker_status(
        current_user_id(),
        round_id
    )

    return jsonify({
        "used": used,
        "remaining": remaining
    }), 200