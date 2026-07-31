from flask import Blueprint, jsonify, request
from app.services.tipy_service import TipyService as service

tipy_bp = Blueprint('tipy', __name__, url_prefix='/api')

@tipy_bp.route('/leaderboard', methods=['GET'])
def get_leaderboard():
    users = service.leaderboard()
    return jsonify([user.to_dict() for user in users]), 200
@tipy_bp.route('/tips/<int:user_id>/<int:round_id>', methods=['GET'])
def get_tips_for_user(user_id, round_id):
    tips = service.get_tips_for_user_and_round(user_id, round_id)
    return jsonify([tip.to_dict() for tip in tips]), 200
@tipy_bp.route('/tips/<int:user_id>/<int:round_id>', methods=['POST', 'PUT'])
def save_tip(user_id, round_id):
    data = request.json
    tip = service.create_tip(user_id, round_id, data)
    if request.method == 'POST':
        return jsonify({
                "message": "Tip created",
                "tip": tip.to_dict()
            }), 201
    elif request.method == 'PUT':
        return jsonify({
                "message": "Tip created",
                "tip": tip.to_dict()
            }), 200
    
@tipy_bp.route('/tips/<int:tip_id>', methods=['DELETE'])
def delete_tip(tip_id):
    tip = service.delete_tip(tip_id)
    return jsonify({
            "message": "Tip deleted",
            "tip": tip.to_dict()
        }), 200
    
@tipy_bp.route('/rounds/<int:round_id>/matches', methods=['GET'])
def round_matches(round_id):
    kolo, matches = service.round_matches(round_id)
    return jsonify({
        "round" : kolo.to_dict(),
        "matches" : [match.to_dict() for match in matches]
    }), 200
@tipy_bp.route('/rounds', methods=['GET'])
def get_rounds():
    all_rounds = service.get_rounds()
    return jsonify([round.to_dict() for round in all_rounds]), 200
@tipy_bp.route('/users/<int:user_id>/joker-status/<int:round_id>', methods=['GET'])
def jokers(user_id, round_id):
    joker_used, remaining = service.joker_status(user_id, round_id)
    return jsonify({
        "used" : joker_used,
        "remaining" : remaining
    }), 200
