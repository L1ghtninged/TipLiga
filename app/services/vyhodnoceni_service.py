from app.models.predpoved_vysledku import PredpovedVysledku
from app.dao.predpoved_vysledku_dao import PredpovedVysledkuDAO 
from app.models.zapas import Zapas
from app.services.tipy_service import TipyService as tipy
from app.dao.zapas_dao import ZapasDAO
from app.dao.kolo_dao import KoloDAO
from app.dao.uzivatel_dao import UzivatelDAO

class VyhodnoceniService:
    PRAVIDLA_BODY = {
        'PRESNY' : 15,
        'VITEZ_ROZDIL' : 6,
        'VITEZ' : 4,
        'REMIZA' : 6,
        'SPATNY_VYSLEDEK' : 0
    }
    
    @staticmethod
    def calculate_match(zapas: Zapas):
        if zapas.stav != "played":
            raise ValueError("Match must be in 'played' state to evaluate points.")
        for predpoved in tipy.get_tips_for_match(zapas.id):
            body_ziskane = VyhodnoceniService.vyhodnot_tip(predpoved, zapas)
            PredpovedVysledkuDAO.update_body(predpoved_id=predpoved.id, body_ziskane=body_ziskane)
    @staticmethod
    def vyhodnot_tip(predpoved_vysledku : PredpovedVysledku, zapas : Zapas = None):
        if zapas is None:
            zapas = ZapasDAO.get_by_id(predpoved_vysledku.zapas_id)
        domaci_predpoved = predpoved_vysledku.predpoved_domaci_skore
        host_predpoved = predpoved_vysledku.predpoved_hostujici_skore
        if None in (domaci_predpoved, host_predpoved):
            return 0
        domaci_skore = zapas.domaci_skore
        host_skore = zapas.hostujici_skore
        
        body = VyhodnoceniService.vyhodnot_body(domaci_skore, host_skore, domaci_predpoved, host_predpoved)
        if predpoved_vysledku.is_joker:
            body *= 2 
        return body
        
    @staticmethod
    def vyhodnot_body(domaci_skore, host_skore,domaci_predpoved, host_predpoved):
        if domaci_skore == domaci_predpoved and host_skore == host_predpoved:
            return VyhodnoceniService.PRAVIDLA_BODY["PRESNY"]

        rozdil_skore = domaci_skore - host_skore
        rozdil_tip = domaci_predpoved - host_predpoved

        if rozdil_skore == 0 and rozdil_tip == 0:
            return VyhodnoceniService.PRAVIDLA_BODY["REMIZA"]

        if rozdil_skore == rozdil_tip:
            return VyhodnoceniService.PRAVIDLA_BODY["VITEZ_ROZDIL"]

        if rozdil_skore * rozdil_tip > 0:
            return VyhodnoceniService.PRAVIDLA_BODY["VITEZ"]

        return VyhodnoceniService.PRAVIDLA_BODY["SPATNY_VYSLEDEK"]
    @staticmethod
    def calculate_round(round_id):
        kolo = KoloDAO.find_by_id(round_id)
        if kolo.is_closed == False:
            raise ValueError("Round must be closed to calculate points.")
        matches = ZapasDAO.get_by_kolo(round_id)
        for match in matches:
            VyhodnoceniService.calculate_match(match)
        
        kolo.close_round()
        KoloDAO.update(kolo)
        return matches
    @staticmethod
    def recalculate_tips():
        all_tips = PredpovedVysledkuDAO.get_all()
        for tip in all_tips:
            points = VyhodnoceniService.vyhodnot_tip(predpoved_vysledku=tip)
            PredpovedVysledkuDAO.update_body(tip.id, points)
    @staticmethod
    def recalculate():
        users = UzivatelDAO.get_all()
        for user in users:
            
            tips = PredpovedVysledkuDAO.get_by_uzivatel(user.id)
            points = VyhodnoceniService.add_all_points(tips=tips)
            UzivatelDAO.update_points(uzivatel_id=user.id, nove_body=points)
        
    @staticmethod
    def add_all_points(tips):
        sum = 0
        for tip in tips:
            sum += tip.body_ziskane
        return sum