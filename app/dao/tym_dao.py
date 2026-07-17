from app.db import execute_query
from app.models.tym import Tym


class TymDAO:

    @staticmethod
    def get_all():
        sql = "SELECT id, nazev, logo_url FROM Tym ORDER BY nazev ASC"
        rows = execute_query(sql, fetch="all")
        return [Tym(**row) for row in rows]

    @staticmethod
    def get_by_id(tym_id):
        sql = "SELECT id, nazev, logo_url FROM Tym WHERE id = %s"
        row = execute_query(sql, (tym_id,), fetch="one")
        return Tym(**row) if row else None

    @staticmethod
    def get_by_nazev(nazev):
        """
        Najde tým podle přesného názvu. Užitečné pro kontrolu duplicit při importu/vytváření.
        Vrací objekt Tym, nebo None.
        """
        sql = "SELECT id, nazev, logo_url FROM Tym WHERE nazev = %s"
        row = execute_query(sql, (nazev,), fetch="one")

        if not row:
            return None

        return Tym(
            id=row["id"],
            nazev=row["nazev"],
            logo_url=row["logo_url"]
        )

    @staticmethod
    def create(nazev, logo_url=None):
        """
        Vytvoří nový tým v databázi. Logo je nepovinné.
        Vrací ID nově vytvořeného týmu.
        """
        sql = "INSERT INTO Tym (nazev, logo_url) VALUES (%s, %s)"
        novy_id = execute_query(sql, (nazev, logo_url), fetch="none")
        return novy_id

    @staticmethod
    def update(tym_id, nazev, logo_url):
        """
        Aktualizuje název a/nebo URL loga existujícího týmu.
        """
        sql = "UPDATE Tym SET nazev = %s, logo_url = %s WHERE id = %s"
        execute_query(sql, (nazev, logo_url, tym_id), fetch="none")

    @staticmethod
    def delete(tym_id):
        """
        Smaže tým z databáze.
        POZOR: Tento krok selže (nebo smaže související data), pokud je tým již přiřazen
        v nějakém zápasu v tabulce Zapas (jako domácí nebo hostující).
        """
        sql = "DELETE FROM Tym WHERE id = %s"
        execute_query(sql, (tym_id,), fetch="none")