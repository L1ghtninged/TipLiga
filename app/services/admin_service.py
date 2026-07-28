import re
from app.models.uzivatel import Uzivatel
from app.dao.uzivatel_dao import UzivatelDAO
from app.dao.kolo_dao import KoloDAO
from app.models.kolo import Kolo
from app.models.tym import Tym
from app.dao.tym_dao import TymDAO
from routes.exceptions import *


class AdminService:

    USERNAME_PATTERN = r"^[a-zA-Z][a-zA-Z0-9_]{2,19}$"

    @staticmethod
    def new_user(data):
        username = data.get("username")

        if not username:
            raise ValidationError("Username is required")

        if not re.match(AdminService.USERNAME_PATTERN, username):
            raise ValidationError("Invalid username format")

        id = UzivatelDAO.create(username)
        uzivatel = Uzivatel(id, username=username, pocet_bodu=0)
        return uzivatel
    @staticmethod
    def delete_user(username):
        if not username:
            raise ValueError("Username is required")

        uzivatel = UzivatelDAO.get_by_username(username)  # Check if user exists
        if not uzivatel:
            raise ValueError("User not found")
        UzivatelDAO.delete(uzivatel.id)
        return uzivatel
    @staticmethod
    def get_all_users():
        users = UzivatelDAO.get_all()
        return users
    @staticmethod
    def create_round(round_number):
        if not isinstance(round_number, int) or round_number <= 0:
            raise ValidationError("Round number must be a positive integer")
        
        kolo = Kolo(round_number=round_number, is_closed=False, closed_at=None)
        kolo_id = KoloDAO.create(kolo)
        kolo.id = kolo_id
        return kolo
    @staticmethod
    def delete_round(round_number):
        if not isinstance(round_number, int) or round_number <= 0:
            raise ValidationError("Round number must be a positive integer")
        
        kolo = KoloDAO.find_by_number(round_number)
        KoloDAO.delete(kolo)
        return kolo    
    @staticmethod
    def get_all_rounds():
        rounds = KoloDAO.get_all()
        return rounds
    @staticmethod
    def get_all_teams():
        teams = TymDAO.get_all()
        return teams
    
    @staticmethod
    def create_team(team_name):
        if not team_name:
            raise ValidationError("Team name is required")

        team = Tym(nazev=team_name, logo_url=None)
        team_id = TymDAO.create(team)
        team.id = team_id
        return team
    @staticmethod
    def delete_team(team_id):
        if not isinstance(team_id, int) or team_id <= 0:
            raise ValidationError("Team ID must be a positive integer")
        return TymDAO.delete(team_id)
      