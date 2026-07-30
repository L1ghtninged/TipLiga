from flask import Blueprint, request, jsonify
from app.services.admin_service import AdminService as service
from app.routes.exceptions import *
from app.services.vyhodnoceni_service import VyhodnoceniService as vyhodnoceni

admin_bp = Blueprint('auth', __name__, url_prefix='/api/admin')

@admin_bp.route('/users', methods=['POST'])
def create_user():

        data = request.json
        user = service.new_user(data)
        
        return jsonify({
                "message": "User created",
                "user" : user.to_dict()
            }), 201

@admin_bp.route('/users/<username>', methods=['DELETE'])
def delete_user(username):
        user = service.delete_user(username)
        return jsonify({
                "message": "User deleted",
                "user": user.to_dict()
            }), 200
@admin_bp.route('/users', methods=['GET'])
def get_all_users():
        users = service.get_all_users()
        return jsonify([user.to_dict() for user in users]), 200
@admin_bp.route('/users/<int:user_id>/tips', methods=['GET'])
def get_user_tips(user_id):
        tips = service.get_tips_for_user()
        return jsonify({
                        "user_id": user_id(),
                        "tips": [tip.to_dict() for tip in tips]
                    }), 200

@admin_bp.route("/rounds", methods=["POST"])
def create_round():

        data = request.json

        kolo = service.create_round(
                data["cislo_kola"]
        )

        return jsonify({
        "message": "Round created",
        "id": kolo.id
    }), 201
@admin_bp.route("/rounds/<int:round_number>", methods=["DELETE"])
def delete_round(round_number):
        kolo = service.delete_round(round_number)
    
        return jsonify({
                "message": "Round deleted",
                "id": kolo.id
            }), 200
@admin_bp.route("/rounds", methods=["GET"])
def get_all_rounds():
        rounds = service.get_all_rounds()
        return jsonify([kolo.to_dict() for kolo in rounds]), 200

@admin_bp.route("/teams", methods=["GET"])
def get_all_teams():
        teams = service.get_all_teams()
        return jsonify([team.to_dict() for team in teams]), 200
@admin_bp.route('/teams', methods=['POST'])
def create_team():
        data = request.json
        team_name = data.get("nazev")
        team = service.create_team(team_name)
        return jsonify({
                "message": "Team created",
                "id": team.id
            }), 201
@admin_bp.route('/teams/<int:team_id>', methods=['DELETE'])
def delete_team(team_id):
        service.delete_team(team_id)
        return jsonify({
                "message": "Team deleted",
                "id": team_id
            }), 200
@admin_bp.route('/teams/<int:team_id>/logo', methods=['PUT'])
def add_logo_url(team_id):
        data = request.json
        logo_url = data.get("logo_url")
        service.add_logo_url(team_id, logo_url)
        return jsonify({
                "message": "Logo URL added",
                "team_id": team_id,
                "logo_url": logo_url
            }), 200
@admin_bp.route('/matches', methods=['POST'])
def create_match():
        data = request.json
        match = service.create_match(data)
        return jsonify({
                "message": "Match created",
                "match": match.to_dict()
            }), 201
@admin_bp.route('/matches/<int:match_id>', methods=['DELETE'])
def delete_match(match_id):
        service.delete_match(match_id)
        return jsonify({
                "message": "Match deleted",
                "match_id": match_id
            }), 200
@admin_bp.route('/matches/<int:match_id>', methods=['PUT'])
def update_match(match_id):
        data = request.json
        domaci_skore = data.get("domaci_skore")
        hostujici_skore = data.get("hostujici_skore")
        match = service.update_match_score(match_id, domaci_skore, hostujici_skore)
        return jsonify({
                "message": "Match updated",
                "match": match.to_dict()
            }), 200
@admin_bp.route('/matches/<int:round_id>', methods=['GET'])
def get_matches_by_round(round_id):
        matches = service.get_matches_by_round(round_id)
        return jsonify([match.to_dict() for match in matches]), 200
@admin_bp.route('/matches/<int:match_id>/reschedule', methods=['PUT'])
def reschedule_match(match_id):
        data = request.json
        novy_cas = data.get("zacatek_zapasu")
        stav = data.get("stav")
        match = service.update_stav_a_cas(match_id, novy_cas, stav)
        return jsonify({
                "message": "Match rescheduled",
                "match": match.to_dict()
            }), 200
@admin_bp.route('/matches/<int:match_id>/close', methods=['PUT'])
def close_match(match_id):
        match = service.update_stav_a_cas(match_id, None, "played")
        vyhodnoceni.calculate_match(match)
        return jsonify({
                "message": "Match closed and points assigned",
                "match": match.to_dict()
            }), 200
@admin_bp.route('/tips/<int:match_id>', methods=['GET'])
def get_tips_for_match(match_id):
        users = service.get_all_users_with_tips_for_match(match_id)
        return jsonify([user.to_dict() for user in users.values()]), 200
@admin_bp.route('/rounds/<int:round_id>/close', methods=['PUT'])
def close_round(round_id):
        kolo = service.close_round(round_id)
        return jsonify({
                "message" : "Round closed",
                "round" : kolo.to_dict()
        }), 200
@admin_bp.route('/rounds/<int:round_id>/calculate', methods=['PUT'])
def calculate_round(round_id):
        matches = vyhodnoceni.calculate_round()
        return jsonify({
                "message" : "Tips calculated and round closed",
                "round_id" : round_id,
                "matches":[match.to_dict() for match in matches],
                }), 200
@admin_bp.route('/tips/<int:tip_id>', methods=['PUT'])
def change_tip(tip_id):
        data = request.json
        domaci_predpoved = data.get('predpoved_domaci_skore')
        host_predpoved = data.get('predpoved_hostujici_skore')
        is_joker = data.get('is_joker', False)
        
        tip = service.change_tip(tip_id, domaci_predpoved, host_predpoved, is_joker)
        return jsonify({
                        "message" : "Tip changed",
                        "tip": tip.to_dict(),
                        }), 200

"""
✅ POST /recalculate - Přepočítání po nějaké ruční úpravě
✅ PUT /tips/{id} - Úprava tipu adminem, pokud nastane chyba(Poté bude užitečné i to přepočítání)
"""
