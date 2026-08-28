from app.dao.predpoved_vysledku_dao import PredpovedVysledkuDAO
from app.services.tipy_service import TipyService
from app.dao.uzivatel_dao import UzivatelDAO
from app.dao.kolo_dao import KoloDAO
from app.routes.exceptions import ValidationError
class ResultsService:
    @staticmethod
    def round_results(round_id):

        # Ověříme, že kolo existuje
        round_info = KoloDAO.find_by_id(round_id)

        if round_info is None:
            raise ValidationError("Round does not exist.")
        if not round_info.is_closed:
            return {
                "kolo" : round_info.to_dict(),
                "message" : "Round is not closed."
            }
        # Pořadí po vybraném kole
        rankings = ResultsService.rankings(round_info.cislo_kola)

        # Zápasy + všechny tipy
        matches = ResultsService.matches_data(round_id)

        return {
            "kolo": round_info.to_dict(),
            "poradi": rankings,
            "zapasy": matches
        }
    @staticmethod
    def rankings(round_index):

        users = UzivatelDAO.get_rankings_until_round(round_index)

        rankings = []

        for index, user in enumerate(users, start=1):

            rankings.append({
                "poradi": index,
                "uzivatel_id": user["uzivatel_id"],
                "username": user["username"],
                "body_za_kolo": int(user["body_za_kolo"]),
                "body": int(user["body"])
            })

        return rankings

    @staticmethod
    def matches_data(round_id):

        # Základní data zápasů
        matches = TipyService.round_matches(round_id)

        # Všechny tipy v daném kole včetně username
        tips = PredpovedVysledkuDAO.get_by_kolo(round_id)

        # Rozdělení tipů podle zápasu
        tips_by_match = {}

        for tip in tips:
            zapas_id = tip["zapas_id"]

            if zapas_id not in tips_by_match:
                tips_by_match[zapas_id] = []

            tips_by_match[zapas_id].append(tip)

        # Přidání tipů ke konkrétním zápasům
        for match in matches:
            match["tipy"] = [
                {
                    "id": tip["id"],
                    "uzivatel_id": tip["uzivatel_id"],
                    "username": tip["username"],
                    "predpoved_domaci_skore": tip["predpoved_domaci_skore"],
                    "predpoved_hostujici_skore": tip["predpoved_hostujici_skore"],
                    "is_joker": tip["is_joker"],
                    "body_ziskane": tip["body_ziskane"],
                    "created_at": (
                        tip["created_at"].isoformat()
                        if tip["created_at"]
                        else None
                    )
                }
                for tip in tips_by_match.get(match["id"], [])
            ]

        return matches
    
