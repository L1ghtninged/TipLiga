from datetime import datetime
import re
from app.dao.predpoved_vysledku_dao import PredpovedVysledkuDAO
from app.models.uzivatel import Uzivatel
from app.dao.uzivatel_dao import UzivatelDAO
from app.dao.kolo_dao import KoloDAO
from app.models.kolo import Kolo
from app.models.tym import Tym
from app.dao.tym_dao import TymDAO
from app.models.zapas import Zapas
from app.dao.zapas_dao import ZapasDAO
from app.routes.exceptions import *
from app.utils.validation import is_non_negative_int

class AdminService:

    USERNAME_PATTERN = r'^[^\W\d_]{3,20}$'
    
    @staticmethod
    def new_user(data):
        username = data.get("username")

        if not username:
            raise ValidationError("Username is required")

        if not isinstance(username, str):
            raise ValidationError("Username must be a string.")

        username = username.strip()

        if not username:
            raise ValidationError("Username is required.")

        if not re.fullmatch(AdminService.USERNAME_PATTERN, username):
            raise ValidationError("Invalid username format.")

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
    def get_tips_for_user(user_id):
        tips = PredpovedVysledkuDAO.get_by_uzivatel(user_id)
        return tips
    @staticmethod
    def create_rounds(count):
        if not isinstance(count, int) or count <= 0:
            raise ValidationError("Count must be a positive integer")
        max_round = KoloDAO.get_max_round_number()

        start_number = (max_round + 1 if max_round is not None else 1)
        for i in range(start_number, start_number + count):
            kolo = Kolo(cislo_kola=i, is_closed=False, closed_at=None)
            kolo_id = KoloDAO.create(kolo)
            kolo.id = kolo_id
        
    @staticmethod
    def create_round(round_number):
        if not isinstance(round_number, int) or round_number <= 0:
            raise ValidationError("Round number must be a positive integer")
        
        kolo = Kolo(cislo_kola=round_number, is_closed=False, closed_at=None)
        kolo_id = KoloDAO.create(kolo)
        kolo.id = kolo_id
        return kolo
    @staticmethod
    def delete_round(round_id):
        if not isinstance(round_id, int) or round_id <= 0:
            raise ValidationError("Round ID must be a positive integer")
        
        kolo = KoloDAO.find_by_id(round_id)
        if kolo is None:
            raise ValidationError("Round does not exist.")
        KoloDAO.delete(kolo.id)
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
        if not isinstance(team_name, str):
            raise ValidationError("Team name must be a string.")

        team_name = team_name.strip()

        if not team_name:
            raise ValidationError("Team name is required.")

        if len(team_name) > 100:
            raise ValidationError("Team name is too long.")

        team = Tym(id = None, nazev=team_name, logo_url=None)
        team_id = TymDAO.create(nazev=team_name, logo_url=None)
        team.id = team_id
        return team
    @staticmethod
    def delete_team(team_id):
        if not isinstance(team_id, int) or team_id <= 0:
            raise ValidationError("Team ID must be a positive integer")
        return TymDAO.delete(team_id)
    @staticmethod
    def add_logo_url(team_id, logo_url):
        if not isinstance(team_id, int) or team_id <= 0:
            raise ValidationError("Team ID must be a positive integer")
        if not logo_url:
            raise ValidationError("Logo URL is required")
        
        team = TymDAO.get_by_id(team_id)
        if not team:
            raise ValidationError("Team not found")
        
        team.logo_url = logo_url
        TymDAO.update(team.id, team.nazev, team.logo_url)
        return team
    @staticmethod
    def create_match(data):
        kolo_id = data.get("kolo_id")
        domaci_tym_id = data.get("domaci_tym_id")
        hostujici_tym_id = data.get("hostujici_tym_id")
        zacatek_zapasu = data.get("zacatek_zapasu")
        stav = data.get("stav")
        if None in [kolo_id, domaci_tym_id, hostujici_tym_id, zacatek_zapasu]:
            raise ValidationError('Nonexistent values.')
        domaci_tym = TymDAO.get_by_id(domaci_tym_id)
        host_tym = TymDAO.get_by_id(hostujici_tym_id)
        if None in [domaci_tym, host_tym]:
            raise ValueError("One of the teams don't exist.")
        if domaci_tym_id == hostujici_tym_id:
            raise ValidationError("Home and away teams must be different")
        if stav not in ["scheduled", "played", "postponed"]:
            stav = "scheduled"
        if zacatek_zapasu == '':
            zacatek_zapasu =  None
        zacatek_zapasu = datetime.fromisoformat(zacatek_zapasu) if isinstance(zacatek_zapasu, str) else zacatek_zapasu
        zapas = Zapas(id=None, kolo_id=kolo_id, domaci_tym_id=domaci_tym_id, hostujici_tym_id=hostujici_tym_id,zacatek_zapasu=zacatek_zapasu, stav=stav, domaci_skore=None, hostujici_skore=None)
        id = ZapasDAO.create(kolo_id, domaci_tym_id, hostujici_tym_id, zacatek_zapasu, stav)
        zapas.id = id
        return zapas       
    @staticmethod
    def delete_match(zapas_id):
        if not isinstance(zapas_id, int) or zapas_id <= 0:
            raise ValidationError("Match ID must be a positive integer")
        zapas = ZapasDAO.get_by_id(zapas_id=zapas_id)
        if zapas is None:
            raise ValidationError('Match does not exist.')
        ZapasDAO.delete(zapas_id)
        return zapas
    @staticmethod
    def get_matches_by_round(kolo_id):
        if not isinstance(kolo_id, int) or kolo_id <= 0:
            raise ValidationError("Round ID must be a positive integer")
        matches = ZapasDAO.get_by_kolo(kolo_id)
        return matches
    @staticmethod
    def update_match_score(zapas_id, domaci_skore, hostujici_skore):
        
        if not isinstance(zapas_id, int) or zapas_id <= 0:
            raise ValidationError("Match ID must be a positive integer")
        if not isinstance(domaci_skore, int) or not isinstance(hostujici_skore, int) or domaci_skore < 0 or hostujici_skore < 0:
            raise ValidationError("Scores must be non-negative integers")
        
        zapas = ZapasDAO.get_by_id(zapas_id)
        
        if not zapas:
            raise ValidationError("Match not found")
        kolo = KoloDAO.find_by_id(zapas.kolo_id)
        if kolo is None:
            raise ValueError("Match does not belong to a round")
        
        
        ZapasDAO.update_vysledek(zapas_id, domaci_skore, hostujici_skore, "played")
        zapas.domaci_skore = domaci_skore
        zapas.hostujici_skore = hostujici_skore
        return zapas
    @staticmethod
    def update_stav_a_cas(zapas_id, novy_cas, stav):
        if not isinstance(zapas_id, int) or zapas_id <= 0:
            raise ValidationError("Match ID must be a positive integer")
        if stav not in ["scheduled", "played", "postponed"]:
            raise ValidationError("Invalid match state")
        
        zapas = ZapasDAO.get_by_id(zapas_id)
        
        if not zapas:
            raise ValidationError("Match not found")
        if novy_cas == '':
            novy_cas = None
        if isinstance(novy_cas, str):
            novy_cas = datetime.fromisoformat(novy_cas)
        ZapasDAO.update_stav_a_cas(zapas_id, novy_cas, stav)
        zapas.zacatek_zapasu = novy_cas
        zapas.stav = stav
        return zapas
    @staticmethod
    def get_all_users_with_tips_for_match(zapas_id):
        if not isinstance(zapas_id, int) or zapas_id <= 0:
            raise ValidationError("Match ID must be a positive integer")
        
        users_with_tips = PredpovedVysledkuDAO.get_by_zapas(zapas_id)
        return users_with_tips
    @staticmethod
    def close_round(round_id):
        round = KoloDAO.find_by_id(round_id)
        if round is None:
            raise ValidationError('Round does not exist.')
        round.close_round()
        KoloDAO.update(round)
        return round
    @staticmethod
    def reopen_round(round_id: int):
        round = KoloDAO.find_by_id(round_id)

        if round is None:
            raise ValueError("Kolo neexistuje.")

        if not round.is_closed:
            raise ValueError("Kolo je již otevřené.")

        round.open_round()
        KoloDAO.update(round)
        return round
    @staticmethod
    def change_tip(tip_id, predpoved_domaci_skore, predpoved_host_skore, match_id, is_joker = False):
        tip = PredpovedVysledkuDAO.get_by_id(tip_id)
        if tip is None:
            raise ValidationError("Tip does not exist.")
        tip.predpoved_domaci_skore = predpoved_domaci_skore
        tip.predpoved_hostujici_skore = predpoved_host_skore
        tip.is_joker = is_joker
        tip.zapas_id = match_id        
        if not is_non_negative_int(predpoved_domaci_skore):
            raise ValidationError("Invalid home prediction.")

        if not is_non_negative_int(predpoved_host_skore):
            raise ValidationError("Invalid away prediction.")

        if not isinstance(is_joker, bool):
            raise ValidationError("is_joker must be a boolean.")

        if not isinstance(match_id, int) or isinstance(match_id, bool) or match_id <= 0:
            raise ValidationError("Invalid match ID.")
        PredpovedVysledkuDAO.save(uzivatel_id=tip.uzivatel_id, 
                                  predpoved_domaci_skore=tip.predpoved_domaci_skore,
                                  predpoved_hostujici_skore=tip.predpoved_hostujici_skore,
                                  zapas_id=match_id,
                                  is_joker=tip.is_joker)
        return tip
        
    
    
    