from datetime import datetime
from app.dao.predpoved_umisteni_dao import PredpovedUmisteniDAO, PredpovedUmisteni
from app.dao.tym_dao import TymDAO
from app.dao.uzivatel_dao import UzivatelDAO
from app.dao.predpoved_vysledku_dao import PredpovedVysledkuDAO
from app.models import kolo
from app.models.predpoved_vysledku import PredpovedVysledku
from app.dao.zapas_dao import ZapasDAO
from app.dao.kolo_dao import KoloDAO
from app.models.uzivatel import Uzivatel
from app.routes.exceptions import *
from app.utils.security import ensure_owner
from app.dao.system_settings_dao import SystemSettingsDAO


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
    def save_tip(user_id, round_id, data):

        zapas_id = data.get("zapas_id")

        predpoved_domaci_skore = data.get("predpoved_domaci_skore")
        predpoved_hostujici_skore = data.get("predpoved_hostujici_skore")
        is_joker = data.get("is_joker", False)

        kolo = KoloDAO.find_by_id(round_id)

        if kolo is None:
            raise ValidationError("Round does not exist.")

        if UzivatelDAO.get_by_id(user_id) is None:
            raise ValidationError("User does not exist.")

        if predpoved_domaci_skore is None or predpoved_hostujici_skore is None:
            raise ValidationError("Both scores are required.")

        if predpoved_domaci_skore < 0 or predpoved_hostujici_skore < 0:
            raise ValidationError("Predictions can't be negative.")

        zapas = ZapasDAO.get_by_id(zapas_id)

        if zapas is None:
            raise ValidationError("Match does not exist.")

        if zapas.kolo_id != round_id:
            raise ValidationError("This match belongs to another round.")

        if kolo.is_closed:
            raise ValidationError("Round has already been closed.")

    # --------------------------------------------------
    # Existující tip uživatele pro tento zápas
    # --------------------------------------------------

        existing_tip = PredpovedVysledkuDAO.get_by_uzivatel_and_zapas(user_id, zapas_id)

    # --------------------------------------------------
    # Kontrola jokera
    # --------------------------------------------------

        if is_joker:

        # Pokud už tento tip je joker,
        # uživatel svůj joker pouze zachovává.
            already_has_joker = existing_tip is not None and existing_tip.is_joker

            if not already_has_joker:

                existing_joker = PredpovedVysledkuDAO.count_jokers_used_in_kolo(
                    user_id, round_id
                )

                if existing_joker >= 1:
                    raise ValidationError(
                        "User has already used their joker for this round."
                    )

    # --------------------------------------------------
    # UPDATE existujícího tipu
    # --------------------------------------------------

        if existing_tip is not None:

            existing_tip.predpoved_domaci_skore = predpoved_domaci_skore

            existing_tip.predpoved_hostujici_skore = predpoved_hostujici_skore

            existing_tip.is_joker = is_joker

            PredpovedVysledkuDAO.save(
                existing_tip.uzivatel_id,
                existing_tip.zapas_id,
                existing_tip.predpoved_domaci_skore,
                existing_tip.predpoved_hostujici_skore,
                existing_tip.is_joker
            )

            return existing_tip

    # --------------------------------------------------
    # CREATE nového tipu
    # --------------------------------------------------

        tip = PredpovedVysledku(
            id=None,
            uzivatel_id=user_id,
            zapas_id=zapas_id,
            predpoved_domaci_skore=predpoved_domaci_skore,
            predpoved_hostujici_skore=predpoved_hostujici_skore,
            is_joker=is_joker,
            body_ziskane=0,
            created_at=None,
        )

        tip.id = PredpovedVysledkuDAO.save(
            tip.uzivatel_id,
            tip.zapas_id,
            tip.predpoved_domaci_skore,
            tip.predpoved_hostujici_skore,
            tip.is_joker,
        )

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

        match_data = []

        for match in matches:

            domaci_tym = TymDAO.get_by_id(
                match.domaci_tym_id
            )

            hostujici_tym = TymDAO.get_by_id(
                match.hostujici_tym_id
            )

            match_data.append({
                "id": match.id,

                "domaci_tym": {
                    "id": domaci_tym.id,
                    "nazev": domaci_tym.nazev,
                    "logo_url": domaci_tym.logo_url,
                },

                "hostujici_tym": {
                    "id": hostujici_tym.id,
                    "nazev": hostujici_tym.nazev,
                    "logo_url": hostujici_tym.logo_url,
                },

                "domaci_skore": match.domaci_skore,
                "hostujici_skore": match.hostujici_skore,

                "zacatek_zapasu": (
                    match.zacatek_zapasu.isoformat()
                    if match.zacatek_zapasu
                    else None
                ),

                "stav": match.stav,
            })

        return match_data

    @staticmethod
    def get_rounds():
        rounds = KoloDAO.get_all()
        return rounds

    @staticmethod
    def joker_status(user_id, round_id):
        remaining = (
            TipyService.ALLOWED_JOKERS
            - PredpovedVysledkuDAO.count_jokers_used_in_kolo(
                uzivatel_id=user_id, kolo_id=round_id
            )
        )
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
            tip_count = len(
                PredpovedVysledkuDAO.get_by_uzivatel_and_kolo(
                    uzivatel_id=user_id, kolo_id=round.id
                )
            )
            round_data = {
                "id": round.id,
                "cislo_kola": round.cislo_kola,
                "match_count": match_count,
                "tip_count": tip_count,
                "joker_used": TipyService.joker_status(user_id, round.id)[0],
                "deadline": TipyService.closing_datetime(round.id),
            }
            open_rounds_data.append(round_data)

        dashboard_data = {
            "user": {"id": user.id, "username": user.username},
            "open_rounds": open_rounds_data,
            "leaderboard": [uzivatel.to_dict() for uzivatel in UzivatelDAO.get_all()],
        }
        return dashboard_data

    @staticmethod
    def closing_datetime(round_id):
        return min(
        (
            zapas.zacatek_zapasu
            for zapas in ZapasDAO.get_by_kolo(round_id)
            if zapas.zacatek_zapasu is not None
        ),
            default=None,
        )
    @staticmethod
    def get_profile(user : Uzivatel):
        if user is None:
            raise ValidationError("User does not exist.")
        season_prediction = (PredpovedUmisteniDAO.get_by_uzivatel_id(user.id) or [])

        predpoved_data = []

        for predpoved in season_prediction:

            team = TymDAO.get_by_id(predpoved.tym_id)

            predpoved_data.append({
                "tym_id": predpoved.tym_id,
                "nazev": team.nazev,
                "logo_url": team.logo_url,
                "predpoved_pozice": predpoved.predpoved_pozice,
                "body_ziskane": predpoved.body_ziskane
            })
        
        user_rank = TipyService.get_user_rank(user)
        teams_data = TipyService.get_teams_table()
        pocet_bodu_sezona = sum(predpoved.body_ziskane or 0 for predpoved in season_prediction)
        data = {
            "username": user.username,
            "pocet_bodu": user.pocet_bodu,
            "poradi": user_rank,
            "season_prediction": predpoved_data,
            "teams_table": teams_data,
            "pocet_bodu_sezona": pocet_bodu_sezona,
            "season_ended": TipyService.is_season_evaluated(),
            "season_tips_locked" : TipyService.are_tips_locked()
        }

        return data
    @staticmethod
    def get_teams_table():
        teams = TymDAO.get_all()

        teams_data = [
            {
                "tym_id": team.id,
                "nazev": team.nazev,
                "logo_url" : team.logo_url,
                "body": TipyService.get_team_points(team)
            }
            for team in teams
        ]

        teams_data.sort(
            key=lambda team: team["body"],
            reverse=True
        )

        for index, team in enumerate(teams_data, start=1):
            team["pozice"] = index

        return teams_data
    @staticmethod
    def get_team_points(team):

        zapasy = ZapasDAO.get_by_tym(team.id)
        points = 0
        for zapas in zapasy:

            if zapas.stav != "played":
                continue

            if (
                zapas.domaci_skore is None
                or zapas.hostujici_skore is None
            ):
                continue

            if zapas.domaci_tym_id == team.id:

                if zapas.domaci_skore > zapas.hostujici_skore:
                    points += 3

                elif zapas.domaci_skore == zapas.hostujici_skore:
                    points += 1

            elif zapas.hostujici_tym_id == team.id:

                if zapas.hostujici_skore > zapas.domaci_skore:
                    points += 3

                elif zapas.hostujici_skore == zapas.domaci_skore:
                    points += 1

        return points
    @staticmethod
    def get_user_rank(user: Uzivatel):

        leaderboard = UzivatelDAO.get_all()

        for index, leaderboard_user in enumerate(leaderboard, start=1):

            if leaderboard_user.id == user.id:
                return index

        return None
    @staticmethod
    def is_season_evaluated():
        return SystemSettingsDAO.is_season_evaluated()
    @staticmethod
    def are_tips_locked():
        return SystemSettingsDAO.are_tips_locked()
    @staticmethod
    def save_season_prediction(user_id, standings):
        if SystemSettingsDAO.are_tips_locked():
            raise ValueError(
                "Season tips are locked"
            )

        teams = TymDAO.get_all()

        team_ids = {team.id for team in teams}

        predicted_team_ids = {
            int(item["tym_id"])
            for item in standings
        }

        if len(standings) != len(teams):
            raise ValueError(
                "Je nutné zadat pořadí všech týmů."
            )

        if predicted_team_ids != team_ids:
            raise ValueError(
                "Pořadí musí obsahovat každý tým právě jednou."
            )

        predictions = []

        for position, item in enumerate(standings, start=1):
            predictions.append(
                PredpovedUmisteni(
                    id=None,
                    uzivatel_id=user_id,
                    tym_id=int(item["tym_id"]),
                    predpoved_pozice=position,
                    body_ziskane=0
                )
        )

        PredpovedUmisteniDAO.save_or_update_predpovedi(
            user_id,
            predictions
    )
