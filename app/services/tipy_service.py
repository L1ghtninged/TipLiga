from datetime import datetime
from app.dao.uzivatel_dao import UzivatelDAO
from app.dao.predpoved_vysledku_dao import PredpovedVysledkuDAO
from app.models.predpoved_vysledku import PredpovedVysledku
from app.dao.zapas_dao import ZapasDAO
from app.dao.kolo_dao import KoloDAO
from app.routes.exceptions import *
from app.utils.security import ensure_owner

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
        kolo = KoloDAO.find_by_id(round_id)
        if kolo is None:
            raise ValidationError("Round does not exist.")
        if UzivatelDAO.get_by_id(user_id) is None:
            raise ValidationError('User does not exist.')
        if predpoved_domaci_skore < 0 or predpoved_hostujici_skore < 0:
            raise ValidationError("Predictions can't be negative.")
        is_joker = data.get("is_joker", False)
        zapas = ZapasDAO.get_by_id(zapas_id)
        if zapas is None:
                    raise ValidationError("Match does not exist.")
        if zapas.kolo_id != round_id:
            raise ValidationError("This match belongs to another round.")
        
        if kolo.is_closed:
            raise ValidationError("Round has already been closed.")
        if zapas.stav == "played":
            raise ValidationError("Cannot create tip for a match that has already been played.")
        
        if is_joker:
            existing_joker = PredpovedVysledkuDAO.count_jokers_used_in_kolo(user_id, round_id)
            if existing_joker >= 1:
                raise ValidationError("User has already used their joker for this round.")
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
            raise ValidationError("Tip does not exist.")
        ensure_owner(tip.uzivatel_id)
        PredpovedVysledkuDAO.delete(tip_id)
        return tip
    @staticmethod
    def round_matches(round_id):
        kolo = KoloDAO.find_by_id(round_id)
        if kolo is None:
            raise ValidationError("Round does not exist.")
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
    @staticmethod
    def dashboard(user_id):
        user = UzivatelDAO.get_by_id(user_id)
        if user is None:
            raise ValidationError("User does not exist.")
        rounds = KoloDAO.get_all()
        open_rounds = [round for round in rounds if not round.is_closed]
        open_rounds_data = []
        for round in open_rounds:
            match_count = len(ZapasDAO.get_by_kolo(round.id))
            tip_count = len(PredpovedVysledkuDAO.get_by_uzivatel_and_kolo(uzivatel_id=user_id, kolo_id=round.id))
            round_data = {
                "id": round.id,
                "cislo_kola": round.cislo_kola,
                "match_count" : match_count,
                "tip_count" : tip_count,
                "joker_used": TipyService.joker_status(user_id, round.id)[0],
                "deadline" : TipyService.closing_datetime(round.id)
            }
            open_rounds_data.append(round_data)

        dashboard_data = {
            "user" : {
                "id": user.id,
                "username": user.username
            },
            "open_rounds" : open_rounds_data,
            "leaderboard" : [uzivatel.to_dict() for uzivatel in UzivatelDAO.get_all()]
        }
        return dashboard_data
    @staticmethod
    def closing_datetime(round_id):
        return min(
        (zapas.zacatek_zapasu for zapas in ZapasDAO.get_by_kolo(round_id)),
        default=None)
