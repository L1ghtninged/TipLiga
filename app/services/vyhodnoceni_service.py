from app.models.predpoved_vysledku import PredpovedVysledku
from app.dao.predpoved_vysledku_dao import PredpovedVysledkuDAO 
from app.models.zapas import Zapas
from app.services.tipy_service import TipyService as tipy
from app.dao.zapas_dao import ZapasDAO
from app.dao.kolo_dao import KoloDAO
from app.dao.uzivatel_dao import UzivatelDAO
from app.dao.system_settings_dao import SystemSettingsDAO
from app.dao.predpoved_umisteni_dao import PredpovedUmisteniDAO, PredpovedUmisteni

class VyhodnoceniService:
    PRAVIDLA_BODY = {
        'PRESNY' : 15,
        'VITEZ_ROZDIL' : 6,
        'VITEZ' : 4,
        'REMIZA' : 6,
        'SPATNY_VYSLEDEK' : 0
    }
    PRAVIDLA_PORADI = {
        1 : 30,
        2 : 20,
        3 : 10,
        4 : 5,
        5 : 5,
        6 : 5,
        7 : 5,
        8 : 5,
        9 : 5,
        10 : 5,
        11 : 5,
        12 : 5,
        13 : 5,
        14 : 5,
        15 : 5,
        16 : 15
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
        VyhodnoceniService.recalculate()
        return matches
    @staticmethod
    def recalculate():
        # 1. Přepočítat body jednotlivých tipů
        all_tips = PredpovedVysledkuDAO.get_all()

        for tip in all_tips:
            points = VyhodnoceniService.vyhodnot_tip(tip)
            PredpovedVysledkuDAO.update_body(tip.id, points)

        # 2. Přepočítat celkové body uživatelů
        users = UzivatelDAO.get_all()

        for user in users:

            tips = PredpovedVysledkuDAO.get_by_uzivatel(user.id)
            umisteni = PredpovedUmisteniDAO.get_by_uzivatel_id(user.id)
            standing_points = 0
            if umisteni is not None:
                standing_points = VyhodnoceniService.add_all_points(umisteni)
            points = VyhodnoceniService.add_all_points(tips) + standing_points
            UzivatelDAO.update_points(user.id, points)
        
    @staticmethod
    def add_all_points(tips):
        total = 0

        for tip in tips:
            total += tip.body_ziskane

        return total
    @staticmethod
    def evaluate_standing_points(standings_data):
        if SystemSettingsDAO.is_season_evaluated():
            raise ValueError("Season has already been evaluated")

        users = UzivatelDAO.get_all()

        for user in users:
            predpovedi = VyhodnoceniService.user_standings(user.id)

            for predpoved in predpovedi:
                points = 0
                team_id = predpoved["tym_id"]
                predicted_pos = predpoved["umisteni"]

                real_pos = standings_data.get(team_id)

                if real_pos is None:
                    continue
                
                if predicted_pos == real_pos:
                    points = VyhodnoceniService.evaluate_position(predicted_pos)
                predpoved.body_ziskane = points

            PredpovedUmisteniDAO.save_or_update_predpovedi(user.id, predpovedi)



        SystemSettingsDAO.update_setting("season_evaluated","true")
            
    @staticmethod    
    def user_standings(user_id):
        predpovedi = PredpovedUmisteniDAO.get_by_uzivatel_id(user_id)
        return predpovedi

    @staticmethod
    def evaluate_position(standing):
        return VyhodnoceniService.PRAVIDLA_PORADI[standing]