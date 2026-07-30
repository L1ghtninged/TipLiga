
from app.dao.uzivatel_dao import UzivatelDAO
from app.dao.predpoved_vysledku_dao import PredpovedVysledkuDAO
from app.models.uzivatel import Uzivatel
from app.models.predpoved_vysledku import PredpovedVysledku
from app.models.zapas import Zapas
from app.dao.zapas_dao import ZapasDAO
from app.dao.kolo_dao import KoloDAO
from app.routes.exceptions import *

class TipyService:
    ALLOWED_JOKERS = 1
    @staticmethod
    def leaderboard():
        users = UzivatelDAO.get_all()
        return users
    @staticmethod
    def get_tips_for_user_and_round(user_id, round_id):
        return PredpovedVysledkuDAO.get_by_uzivatel_and_kolo(user_id, round_id)
    @staticmethod
    def get_tips_for_match(zapas_id):
        return PredpovedVysledkuDAO.get_by_zapas(zapas_id)
    @staticmethod
    def create_tip(user_id, round_id, data):
        zapas_id = data.get("zapas_id")
        predpoved_domaci_skore = data.get("predpoved_domaci_skore")
        predpoved_hostujici_skore = data.get("predpoved_hostujici_skore")
        
        if predpoved_domaci_skore < 0 or predpoved_hostujici_skore < 0:
            raise ValidationError("Predictions can't be negative.")
        is_joker = data.get("is_joker", False)
        zapas = ZapasDAO.get_by_id(zapas_id)
        if zapas.kolo_id != round_id:
            raise ValidationError("This match belongs to another round.")
        if zapas is None:
            raise ValueError("Match does not exist.")
        if zapas.stav == "played":
            raise ValueError("Cannot create tip for a match that has already been played.")
        
        if bool(is_joker):
            existing_joker = PredpovedVysledkuDAO.count_jokers_used_in_kolo(user_id, round_id)
            if existing_joker >= 1:
                raise ValueError("User has already used their joker for this round.")
        tip = PredpovedVysledku(
            id=None,
            uzivatel_id=user_id,
            zapas_id=zapas_id,
            predpoved_domaci_skore=predpoved_domaci_skore,
            predpoved_hostujici_skore=predpoved_hostujici_skore,
            is_joker=is_joker,
            body_ziskane=0,
            created_at=None
        )
        tip.id = PredpovedVysledkuDAO.save(tip.uzivatel_id, tip.zapas_id, tip.predpoved_domaci_skore, tip.predpoved_hostujici_skore, tip.is_joker)
        return tip
    @staticmethod
    def delete_tip(tip_id):
        tip = PredpovedVysledkuDAO.get_by_id(tip_id)
        if tip is None:
            raise ValueError("Tip does not exist.")
        PredpovedVysledkuDAO.delete(tip_id)
        return tip
    @staticmethod
    def round_matches(round_id):
        kolo = KoloDAO.find_by_id(round_id)
        if kolo is None:
            raise ValueError("Round does not exist.")
        matches = ZapasDAO.get_by_kolo(round_id)
        
        return kolo, matches
    @staticmethod
    def get_rounds():
        rounds = KoloDAO.get_all()
        return rounds
    @staticmethod
    def joker_status(user_id, round_id):
        remaining = TipyService.ALLOWED_JOKERS - PredpovedVysledkuDAO.count_jokers_used_in_kolo(uzivatel_id=user_id, kolo_id=round_id)
        joker_used = False
        if remaining == 0:
            joker_used = True
        return joker_used, remaining