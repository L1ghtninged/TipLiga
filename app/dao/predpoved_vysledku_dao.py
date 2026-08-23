from app.db import execute_query
from app.models.predpoved_vysledku import PredpovedVysledku


class PredpovedVysledkuDAO:

    @staticmethod
    def get_all():
        """
        Načte úplně všechny předpovědi z databáze.
        """
        sql = """
            SELECT id, uzivatel_id, zapas_id, predpoved_domaci_skore, 
                   predpoved_hostujici_skore, is_joker, body_ziskane, created_at 
            FROM PredpovedVysledku
        """
        rows = execute_query(sql, fetch="all")
        return [
            PredpovedVysledku(
                id=row["id"],
                uzivatel_id=row["uzivatel_id"],
                zapas_id=row["zapas_id"],
                predpoved_domaci_skore=row["predpoved_domaci_skore"],
                predpoved_hostujici_skore=row["predpoved_hostujici_skore"],
                is_joker=bool(row["is_joker"]),
                body_ziskane=row["body_ziskane"],
                created_at=row["created_at"]
            ) for row in rows
        ]

    @staticmethod
    def get_by_id(predpoved_id):
        """
        Najde předpověď podle jejího ID.
        """
        sql = """
            SELECT id, uzivatel_id, zapas_id, predpoved_domaci_skore, 
                   predpoved_hostujici_skore, is_joker, body_ziskane, created_at 
            FROM PredpovedVysledku 
            WHERE id = %s
        """
        row = execute_query(sql, (predpoved_id,), fetch="one")
        if not row:
            return None

        return PredpovedVysledku(
            id=row["id"],
            uzivatel_id=row["uzivatel_id"],
            zapas_id=row["zapas_id"],
            predpoved_domaci_skore=row["predpoved_domaci_skore"],
            predpoved_hostujici_skore=row["predpoved_hostujici_skore"],
            is_joker=bool(row["is_joker"]),
            body_ziskane=row["body_ziskane"],
            created_at=row["created_at"]
        )

    @staticmethod
    def get_by_uzivatel_and_zapas(uzivatel_id, zapas_id):
        """
        Najde předpověď konkrétního uživatele pro konkrétní zápas.
        Užitečné pro kontrolu, zda uživatel pro daný zápas již netipoval
        (abychom věděli, zda dělat INSERT nebo UPDATE).
        """
        sql = """
            SELECT id, uzivatel_id, zapas_id, predpoved_domaci_skore, 
                   predpoved_hostujici_skore, is_joker, body_ziskane, created_at 
            FROM PredpovedVysledku 
            WHERE uzivatel_id = %s AND zapas_id = %s
        """
        row = execute_query(sql, (uzivatel_id, zapas_id), fetch="one")
        if not row:
            return None

        return PredpovedVysledku(
            id=row["id"],
            uzivatel_id=row["uzivatel_id"],
            zapas_id=row["zapas_id"],
            predpoved_domaci_skore=row["predpoved_domaci_skore"],
            predpoved_hostujici_skore=row["predpoved_hostujici_skore"],
            is_joker=bool(row["is_joker"]),
            body_ziskane=row["body_ziskane"],
            created_at=row["created_at"]
        )

    @staticmethod
    def get_by_uzivatel(uzivatel_id):
        """
        Vrátí všechny předpovědi jednoho konkrétního uživatele.
        Tohle využiješ na profilu uživatele nebo v jeho přehledu tipů.
        """
        sql = """
            SELECT id, uzivatel_id, zapas_id, predpoved_domaci_skore, 
                   predpoved_hostujici_skore, is_joker, body_ziskane, created_at 
            FROM PredpovedVysledku 
            WHERE uzivatel_id = %s
        """
        rows = execute_query(sql, (uzivatel_id,), fetch="all")
        return [
            PredpovedVysledku(
                id=row["id"],
                uzivatel_id=row["uzivatel_id"],
                zapas_id=row["zapas_id"],
                predpoved_domaci_skore=row["predpoved_domaci_skore"],
                predpoved_hostujici_skore=row["predpoved_hostujici_skore"],
                is_joker=bool(row["is_joker"]),
                body_ziskane=row["body_ziskane"],
                created_at=row["created_at"]
            ) for row in rows
        ]

    @staticmethod
    def get_by_zapas(zapas_id):
        """
        Načte všechny předpovědi pro jeden konkrétní zápas.
        Skvělé pro porovnání tipů ostatních hráčů (např. po uzamčení zápasu).
        """
        sql = """
            SELECT id, uzivatel_id, zapas_id, predpoved_domaci_skore, 
                   predpoved_hostujici_skore, is_joker, body_ziskane, created_at 
            FROM PredpovedVysledku 
            WHERE zapas_id = %s
        """
        rows = execute_query(sql, (zapas_id,), fetch="all")
        return [
            PredpovedVysledku(
                id=row["id"],
                uzivatel_id=row["uzivatel_id"],
                zapas_id=row["zapas_id"],
                predpoved_domaci_skore=row["predpoved_domaci_skore"],
                predpoved_hostujici_skore=row["predpoved_hostujici_skore"],
                is_joker=bool(row["is_joker"]),
                body_ziskane=row["body_ziskane"],
                created_at=row["created_at"]
            ) for row in rows
        ]

    @staticmethod
    def save(uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker=False):
        """
        Chytrá metoda, která uloží tip. Pokud tip uživatele pro daný zápas
        již existuje, provede UPDATE. Pokud neexistuje, provede INSERT.
        Tím se vyhneš zbytečnému duplikování metod na frontendu.
        """
        existujici = PredpovedVysledkuDAO.get_by_uzivatel_and_zapas(uzivatel_id, zapas_id)

        if existujici:
            sql = """
                UPDATE PredpovedVysledku 
                SET predpoved_domaci_skore = %s, predpoved_hostujici_skore = %s, is_joker = %s
                WHERE id = %s
            """
            execute_query(sql, (predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, existujici.id),
                          fetch="none")
            return existujici.id
        else:
            sql = """
                INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker) 
                VALUES (%s, %s, %s, %s, %s)
            """
            novy_id = execute_query(sql, (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore,
                                          is_joker), fetch="none")
            return novy_id

    @staticmethod
    def update_body(predpoved_id, body_ziskane):
        """
        Aktualizuje získané body za konkrétní předpověď.
        Používá se při vyhodnocení zápasu administrátorem.
        """
        sql = "UPDATE PredpovedVysledku SET body_ziskane = %s WHERE id = %s"
        execute_query(sql, (body_ziskane, predpoved_id), fetch="none")

    @staticmethod
    def delete(predpoved_id):
        """
        Smaže předpověď.
        """
        sql = "DELETE FROM PredpovedVysledku WHERE id = %s"
        execute_query(sql, (predpoved_id,), fetch="none")

    @staticmethod
    def count_jokers_used_in_kolo(uzivatel_id, kolo_id):
        """
        Pomocná metoda, která zjistí, kolik žolíků (jokerů) uživatel v daném kole už použil.
        Typicky má uživatel povoleného maximálně 1 žolíka na celé kolo.
        """
        sql = """
            SELECT COUNT(p.id) AS pocet 
            FROM PredpovedVysledku p
            JOIN Zapas z ON p.zapas_id = z.id
            WHERE p.uzivatel_id = %s AND z.kolo_id = %s AND p.is_joker = TRUE
        """
        row = execute_query(sql, (uzivatel_id, kolo_id), fetch="one")
        return row["pocet"] if row else 0
    @staticmethod
    def get_by_uzivatel_and_kolo(uzivatel_id, kolo_id):
        """
        Vrátí všechny předpovědi konkrétního uživatele v konkrétním kole.
        Používá se například pro zobrazení všech tipů hráče v daném kole.
        """
        sql = """
            SELECT 
                p.id,
                p.uzivatel_id,
                p.zapas_id,
                p.predpoved_domaci_skore,
                p.predpoved_hostujici_skore,
                p.is_joker,
                p.body_ziskane,
                p.created_at
            FROM PredpovedVysledku p
            JOIN Zapas z ON p.zapas_id = z.id
            WHERE p.uzivatel_id = %s 
              AND z.kolo_id = %s
        """

        rows = execute_query(sql, (uzivatel_id, kolo_id), fetch="all")

        return [
            PredpovedVysledku(
                id=row["id"],
                uzivatel_id=row["uzivatel_id"],
                zapas_id=row["zapas_id"],
                predpoved_domaci_skore=row["predpoved_domaci_skore"],
                predpoved_hostujici_skore=row["predpoved_hostujici_skore"],
                is_joker=bool(row["is_joker"]),
                body_ziskane=row["body_ziskane"],
                created_at=row["created_at"]
            ) for row in rows
        ]
    @staticmethod
    def get_rankings_until_round(round_index):

        sql = """
            SELECT
                u.id AS uzivatel_id,
                u.username,

                COALESCE(SUM(
                    CASE
                        WHEN k.cislo_kola = %s
                        THEN pv.body_ziskane
                        ELSE 0
                    END
                ), 0) AS body_za_kolo,

                COALESCE(SUM(
                    CASE
                        WHEN k.cislo_kola <= %s
                        THEN pv.body_ziskane
                        ELSE 0
                    END
                ), 0) AS body_celkem

            FROM Uzivatel u

            LEFT JOIN PredpovedVysledku pv
                ON pv.uzivatel_id = u.id

            LEFT JOIN Zapas z
                ON pv.zapas_id = z.id

            LEFT JOIN Kolo k
                ON z.kolo_id = k.id

            GROUP BY u.id, u.username

            ORDER BY body_celkem DESC
        """

        return execute_query(
            sql,
            (round_index, round_index),
            fetch="all"
        )
    @staticmethod
    def get_by_kolo(kolo_id):
        sql = """
            SELECT
                p.id,
                p.uzivatel_id,
                p.zapas_id,
                p.predpoved_domaci_skore,
                p.predpoved_hostujici_skore,
                p.is_joker,
                p.body_ziskane,
                p.created_at,
                u.username
            FROM PredpovedVysledku p
            JOIN Zapas z
                ON p.zapas_id = z.id
            JOIN Uzivatel u
                ON p.uzivatel_id = u.id
            WHERE z.kolo_id = %s
            ORDER BY z.id ASC, u.username ASC
        """

        return execute_query(
            sql,
            (kolo_id,),
            fetch="all"
        )