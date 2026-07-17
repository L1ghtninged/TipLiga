
from app.db import execute_query
from app.models.uzivatel import Uzivatel


class UzivatelDAO:

    @staticmethod
    def get_all():
        """
        Načte všechny uživatele seřazené sestupně podle počtu bodů (vhodné pro tabulku výsledků).
        Vrací seznam (list) objektů třídy Uzivatel.
        """
        sql = "SELECT id, username, pocet_bodu, created_at FROM Uzivatel ORDER BY pocet_bodu DESC"
        rows = execute_query(sql, fetch="all")
        return [Uzivatel(**row) for row in rows]

    @staticmethod
    def get_by_id(uzivatel_id):
        """
        Najde jednoho konkrétního uživatele podle jeho ID.
        Vrací objekt Uzivatel, nebo None, pokud uživatel neexistuje.
        """
        sql = "SELECT id, username, pocet_bodu, created_at FROM Uzivatel WHERE id = %s"
        row = execute_query(sql, (uzivatel_id,), fetch="one")
        return Uzivatel(**row) if row else None

    @staticmethod
    def get_by_username(username):
        """
        Najde uživatele podle uživatelského jména (vhodné např. při registraci nebo přihlašování).
        Vrací objekt Uzivatel, nebo None.
        """
        sql = "SELECT id, username, pocet_bodu, created_at FROM Uzivatel WHERE username = %s"
        row = execute_query(sql, (username,), fetch="one")
        return Uzivatel(**row) if row else None

    @staticmethod
    def create(username):
        """
        Vytvoří nového uživatele v databázi. Výchozí počet bodů je 0.
        Vrací ID nově vytvořeného uživatele (lastrowid).
        """
        sql = "INSERT INTO Uzivatel (username, pocet_bodu) VALUES (%s, 0)"
        novy_id = execute_query(sql, (username,), fetch="none")
        return novy_id

    @staticmethod
    def update_points(uzivatel_id, nove_body):
        """
        Aktualizuje celkový počet bodů uživatele na konkrétní hodnotu.
        """
        sql = "UPDATE Uzivatel SET pocet_bodu = %s WHERE id = %s"
        execute_query(sql, (nove_body, uzivatel_id), fetch="none")

    @staticmethod
    def add_points(uzivatel_id, pripsane_body):
        """
        Přičte uživateli k jeho stávajícím bodům nově získané body.
        Užitečné při vyhodnocování zápasů / kol.
        """
        sql = "UPDATE Uzivatel SET pocet_bodu = pocet_bodu + %s WHERE id = %s"
        execute_query(sql, (pripsane_body, uzivatel_id), fetch="none")

    @staticmethod
    def delete(uzivatel_id):
        """
        Smaže uživatele podle ID.
        Pozor: Pokud má uživatel cizí klíče v tabulce predpovedi, musely by být nastaveny na ON DELETE CASCADE,
        nebo se musí nejdřív smazat jeho předpovědi v servisu.
        """
        sql = "DELETE FROM Uzivatel WHERE id = %s"
        execute_query(sql, (uzivatel_id,), fetch="none")