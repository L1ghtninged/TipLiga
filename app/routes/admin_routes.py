from flask import Blueprint, request, jsonify
from app.services.admin_service import AdminService as service
from exceptions import *


auth_bp = Blueprint('auth', __name__, url_prefix='/api/admin')

@auth_bp.route('/users', methods=['POST'])
def create_user():

        data = request.json
        user = service.new_user(data)
        
        return jsonify({
                "message": "User created",
                "user" : user.to_dict()
            }), 201

@auth_bp.route('/users/<username>', methods=['DELETE'])
def delete_user(username):
        user = service.delete_user(username)
        return jsonify({
                "message": "User deleted",
                "user": user.to_dict()
            }), 200
@auth_bp.route('/users', methods=['GET'])
def get_all_users():
        users = service.get_all_users()
        return jsonify([user.to_dict() for user in users]), 200

@auth_bp.route("/rounds", methods=["POST"])
def create_round():

        data = request.json

        kolo = service.create_round(
                data["cislo_kola"]
        )

        return jsonify({
        "message": "Round created",
        "id": kolo.id
    }), 201
@auth_bp.route("/rounds/<int:round_number>", methods=["DELETE"])
def delete_round(round_number):
        kolo = service.delete_round(round_number)
    
        return jsonify({
                "message": "Round deleted",
                "id": kolo.id
            }), 200
@auth_bp.route("/rounds", methods=["GET"])
def get_all_rounds():
        rounds = service.get_all_rounds()
        return jsonify([kolo.to_dict() for kolo in rounds]), 200

@auth_bp.route("/teams", methods=["GET"])
def get_all_teams():
        teams = service.get_all_teams()
        return jsonify([team.to_dict() for team in teams]), 200
@auth_bp.route('/teams', methods=['POST'])
def create_team():
        data = request.json
        team_name = data.get("nazev")
        team = service.create_team(team_name)
        return jsonify({
                "message": "Team created",
                "id": team.id
            }), 201
@auth_bp.route('/teams/<int:team_id>', methods=['DELETE'])
def delete_team(team_id):
        service.delete_team(team_id)
        return jsonify({
                "message": "Team deleted",
                "id": team_id
            }), 200
