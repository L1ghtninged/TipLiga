from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required
from app.services.auth_service import AuthService
from app.services.tipy_service import TipyService as service
from app.utils.security import current_user_id
from app.utils.validation import get_json_data
from flask import current_app

tipy_bp = Blueprint("tipy", __name__, url_prefix="/api")


@tipy_bp.route("/profile", methods=["GET"])
@jwt_required()
def get_profile():

    user_id = current_user_id()
    user = AuthService.get_user_by_id(user_id)

    profile = service.get_profile(user)

    return jsonify(profile), 200


@tipy_bp.route("/profile/season-prediction", methods=["PUT"])
@jwt_required()
def update_season_prediction():

    user_id = current_user_id()

    data = get_json_data()

    if not data or "standings" not in data:
        return jsonify({
            "error": "Chybí pořadí týmů."
        }), 400

    try:
        standings = data["standings"]

        if not isinstance(standings, list):
            return jsonify({
                "error": "Pořadí musí být seznam."
            }), 400

        service.save_season_prediction(
            user_id,
            standings
        )

        current_app.logger.info(
            "User %s updated season prediction.",
            user_id
        )

        return jsonify({
            "message": "Předpověď sezóny byla uložena."
        }), 200

    except ValueError as error:
        return jsonify({
            "error": str(error)
        }), 400

    except Exception:
        current_app.logger.exception(
            "Unexpected error while updating season prediction for user %s.",
            user_id
        )

        return jsonify({
            "error": "Nepodařilo se uložit předpověď sezóny."
        }), 500


@tipy_bp.route("/leaderboard", methods=["GET"])
@jwt_required()
def get_leaderboard():

    users = service.leaderboard()

    return jsonify([
        user.to_dict()
        for user in users
    ]), 200


@tipy_bp.route("/tips/<int:round_id>", methods=["GET"])
@jwt_required()
def get_tips_for_user(round_id):

    tips = service.get_tips_for_user_and_round(
        current_user_id(),
        round_id
    )

    return jsonify([
        tip.to_dict()
        for tip in tips
    ]), 200


@tipy_bp.route("/tips/<int:round_id>", methods=["POST", "PUT"])
@jwt_required()
def save_tip(round_id):

    user_id = current_user_id()

    data = get_json_data()

    tip = service.save_tip(
        user_id,
        round_id,
        data
    )

    if request.method == "POST":

        current_app.logger.info(
            "User %s created tip %s in round %s.",
            user_id,
            tip.id,
            round_id
        )

        return jsonify({
            "message": "Tip created",
            "tip": tip.to_dict()
        }), 201

    current_app.logger.info(
        "User %s updated tip %s in round %s.",
        user_id,
        tip.id,
        round_id
    )

    return jsonify({
        "message": "Tip updated",
        "tip": tip.to_dict()
    }), 200


@tipy_bp.route("/tips/<int:tip_id>", methods=["DELETE"])
@jwt_required()
def delete_tip(tip_id):

    user_id = current_user_id()

    tip = service.delete_tip(tip_id)

    current_app.logger.info(
        "User %s deleted tip %s.",
        user_id,
        tip_id
    )

    return jsonify({
        "message": "Tip deleted",
        "tip": tip.to_dict()
    }), 200


@tipy_bp.route("/rounds/<int:round_id>/matches", methods=["GET"])
@jwt_required()
def round_matches(round_id):

    match_data = service.round_matches(round_id)

    return jsonify({
        "matches": match_data
    }), 200


@tipy_bp.route("/rounds", methods=["GET"])
@jwt_required()
def get_rounds():

    rounds = service.get_rounds()

    return jsonify([
        round.to_dict()
        for round in rounds
    ]), 200


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


@tipy_bp.route("/dashboard", methods=["GET"])
@jwt_required()
def dashboard():

    dashboard_data = service.dashboard(
        current_user_id()
    )

    return jsonify(dashboard_data), 200