from app.models.predpoved_vysledku import PredpovedVysledku
from app.dao.predpoved_vysledku_dao import PredpovedVysledkuDAO 
from app.models.zapas import Zapas
from app.services.tipy_service import TipyService as tipy
from app.dao.zapas_dao import ZapasDAO
from app.dao.kolo_dao import KoloDAO

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
    def vyhodnot_tip(predpoved_vysledku : PredpovedVysledku, zapas : Zapas):
        
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
        matches = ZapasDAO.get_by_kolo(round_id)
        for match in matches:
            VyhodnoceniService.calculate_match(match)
        kolo = KoloDAO.find_by_id(round_id)
        kolo.close_round()
        KoloDAO.update(kolo)
        return matches
    @staticmethod
    def calculate_everything():
        pass
        