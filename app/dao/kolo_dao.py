from app.db import execute_query
from app.models.kolo import Kolo


class KoloDAO:

    @staticmethod
    def create(kolo: Kolo):
        """
        Vytvoří nové kolo.
        Vrací ID nově vytvořeného kola.
        """

        query = """
            INSERT INTO Kolo 
            (cislo_kola, is_closed, closed_at)
            VALUES (%s, %s, %s)
        """

        params = (
            kolo.cislo_kola,
            kolo.is_closed,
            kolo.closed_at
        )

        return execute_query(query, params)


    @staticmethod
    def find_by_id(id: int):
        """
        Najde kolo podle ID.
        Vrací objekt Kolo nebo None.
        """

        query = """
            SELECT *
            FROM Kolo
            WHERE id = %s
        """

        result = execute_query(
            query,
            (id,),
            fetch="one"
        )

        if result is None:
            return None

        return Kolo(
            id=result["id"],
            cislo_kola=result["cislo_kola"],
            is_closed=result["is_closed"],
            closed_at=result["closed_at"]
        )


    @staticmethod
    def get_all():
        """
        Vrátí všechna kola.
        """

        query = """
            SELECT *
            FROM Kolo
            ORDER BY cislo_kola
        """

        results = execute_query(
            query,
            fetch="all"
        )

        return [
            Kolo(
                id=row["id"],
                cislo_kola=row["cislo_kola"],
                is_closed=row["is_closed"],
                closed_at=row["closed_at"]
            )
            for row in results
        ]


    @staticmethod
    def find_by_number(cislo_kola: int):
        """
        Najde kolo podle čísla.
        """

        query = """
            SELECT *
            FROM Kolo
            WHERE cislo_kola = %s
        """

        result = execute_query(
            query,
            (cislo_kola,),
            fetch="one"
        )

        if result is None:
            return None

        return Kolo(
            id=result["id"],
            cislo_kola=result["cislo_kola"],
            is_closed=result["is_closed"],
            closed_at=result["closed_at"]
        )


    @staticmethod
    def update(kolo: Kolo):
        """
        Aktualizuje existující kolo.
        """

        query = """
            UPDATE Kolo
            SET 
                cislo_kola = %s,
                is_closed = %s,
                closed_at = %s
            WHERE id = %s
        """

        params = (
            kolo.cislo_kola,
            kolo.is_closed,
            kolo.closed_at,
            kolo.id
        )

        return execute_query(query, params)


    @staticmethod
    def delete(id: int):
        """
        Smaže kolo podle ID.
        """

        query = """
            DELETE FROM Kolo
            WHERE id = %s
        """

        return execute_query(
            query,
            (id,)
        )