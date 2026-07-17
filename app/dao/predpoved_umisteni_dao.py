# app/dao/predpoved_umisteni_dao.py
from app.db import execute_query, execute_batch_query
from app.models.predpoved_umisteni import PredpovedUmisteni


class PredpovedUmisteniDAO:

    @staticmethod
    def get_by_id(predpoved_id):
        """
        Načte jeden konkrétní tip podle ID.
        """
        sql = "SELECT id, uzivatel_id, tym_id, predpoved_pozice, body_ziskane FROM PredpovedUmisteni WHERE id = %s"
        row = execute_query(sql, (predpoved_id,), fetch="one")

        if not row:
            return None

        return PredpovedUmisteni(**row)

    @staticmethod
    def get_by_uzivatel_id(uzivatel_id):
        """
        Načte všechny tipy na umístění pro konkrétního uživatele (celou jeho natipovanou tabulku).
        Seřazeno podle natipované pozice vzestupně (1. až x. místo).
        """
        sql = """
            SELECT id, uzivatel_id, tym_id, predpoved_pozice, body_ziskane 
            FROM PredpovedUmisteni 
            WHERE uzivatel_id = %s
            ORDER BY predpoved_pozice ASC
        """
        rows = execute_query(sql, (uzivatel_id,), fetch="all")

        return [PredpovedUmisteni(**row) for row in rows]

    @staticmethod
    def save_or_update_predpovedi(uzivatel_id, predpovedi_list):
        """
        Hromadně uloží nebo aktualizuje předpovědi umístění pro jednoho uživatele.
        """
        sql = """
            INSERT INTO PredpovedUmisteni (uzivatel_id, tym_id, predpoved_pozice, body_ziskane)
            VALUES (%s, %s, %s, %s)
            ON DUPLICATE KEY UPDATE predpoved_pozice = VALUES(predpoved_pozice)
        """

        # Příprava dat pro execute_batch_query
        data = [
            (uzivatel_id, p.tym_id, p.predpoved_pozice, p.body_ziskane)
            for p in predpovedi_list
        ]

        return execute_batch_query(sql, data)

    @staticmethod
    def smaz_predpovedi_uzivatele(uzivatel_id):
        """
        Smaže kompletní tipy na umístění pro jednoho uživatele (např. při resetu).
        """
        sql = "DELETE FROM PredpovedUmisteni WHERE uzivatel_id = %s"
        execute_query(sql, (uzivatel_id,), fetch="none")
        return True

    @staticmethod
    def vyhodnot_body_umisteni(realne_poradi):
        """
        Vyhodnotí body za umístění pro všechny uživatele najednou na konci ligy.
        """
        # 1. Načteme všechny predikce v systému pomocí execute_query
        sql_select = "SELECT id, tym_id, predpoved_pozice FROM PredpovedUmisteni"
        predpovedi = execute_query(sql_select, fetch="all")

        updates = []
        for p in predpovedi:
            p_id = p["id"]
            tym_id = p["tym_id"]
            tipnuta_pozice = p["predpoved_pozice"]

            if tym_id not in realne_poradi:
                continue

            realna_pozice = realne_poradi[tym_id]
            rozdil = abs(tipnuta_pozice - realna_pozice)

            # Výpočet bodů podle odchylky
            if rozdil == 0:
                body = 10
            elif rozdil == 1:
                body = 5
            elif rozdil == 2:
                body = 2
            else:
                body = 0

            updates.append((body, p_id))

        # 2. Hromadná aktualizace bodů v databázi pomocí execute_batch_query
        if updates:
            sql_update = "UPDATE PredpovedUmisteni SET body_ziskane = %s WHERE id = %s"
            return execute_batch_query(sql_update, updates)

        return False