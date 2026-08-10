# app/dao/zapas_dao.py
from app.db import execute_query
from app.models.zapas import Zapas


class ZapasDAO:

    @staticmethod
    def get_by_id(zapas_id):
        """
        Najde jeden konkrétní zápas podle jeho ID.
        Vrací objekt Zapas, nebo None, pokud neexistuje.
        """
        sql = """
            SELECT id, kolo_id, domaci_tym_id, hostujici_tym_id, domaci_skore, hostujici_skore, zacatek_zapasu, stav
            FROM Zapas 
            WHERE id = %s
        """
        row = execute_query(sql, (zapas_id,), fetch="one")
        return Zapas(**row) if row else None

    @staticmethod
    def get_by_kolo(kolo_id):
        """
        Načte všechny zápasy, které patří do konkrétního kola.
        Vrací seznam (list) objektů Zapas.
        """
        sql = """
            SELECT id, kolo_id, domaci_tym_id, hostujici_tym_id, domaci_skore, hostujici_skore, zacatek_zapasu, stav
            FROM Zapas 
            WHERE kolo_id = %s
            ORDER BY zacatek_zapasu ASC
        """
        rows = execute_query(sql, (kolo_id,), fetch="all")
        return [Zapas(**row) for row in rows]

    @staticmethod
    def get_zapas_with_names(zapas_id):
        """
        Pomocná metoda, která vrátí zápas obohacený o textové názvy týmů.
        Vhodné přímo pro frontend (React), kde nechceš zobrazovat jen ID, ale "Sparta vs Slavia".
        Vrací slovník (dict).
        """
        sql = """
            SELECT 
                z.id, z.kolo_id, z.domaci_skore, z.hostujici_skore, z.zacatek_zapasu, z.stav,
                td.nazev AS domaci_tym_nazev,
                th.nazev AS hostujici_tym_nazev  -- Opraveno z th na th.nazev
            FROM Zapas z
            JOIN Tym td ON z.domaci_tym_id = td.id
            JOIN Tym th ON z.hostujici_tym_id = th.id
            WHERE z.id = %s
        """
        row = execute_query(sql, (zapas_id,), fetch="one")
        return row  # Vrátí přímo dict z databáze (obsahující názvy týmů)

    @staticmethod
    def create(kolo_id, domaci_tym_id, hostujici_tym_id, zacatek_zapasu, stav="scheduled"):
        """
        Vytvoří nový zápas (např. administrátor plánuje kolo).
        Výchozí stav je nastaven na "scheduled" (naplánováno), skóre je na začátku NULL.
        """
        sql = """
            INSERT INTO Zapas (kolo_id, domaci_tym_id, hostujici_tym_id, zacatek_zapasu, stav)
            VALUES (%s, %s, %s, %s, %s)
        """
        novy_id = execute_query(sql, (kolo_id, domaci_tym_id, hostujici_tym_id, zacatek_zapasu, stav), fetch="none")
        return novy_id

    @staticmethod
    def update_vysledek(zapas_id, domaci_skore, hostujici_skore, stav="played"):
        """
        Zadá/aktualizuje konečný výsledek zápasu a změní jeho stav.
        Tuto metodu zavolá administrátor a následně by měla Service vrstva spustit přepočet bodů.
        """
        sql = """
            UPDATE Zapas 
            SET domaci_skore = %s, hostujici_skore = %s, stav = %s 
            WHERE id = %s
        """
        execute_query(sql, (domaci_skore, hostujici_skore, stav, zapas_id), fetch="none")

    @staticmethod
    def update_stav_a_cas(zapas_id, novy_cas, stav):
        """
        Umožňuje posunout čas výkopu nebo změnit stav (např. na "POSTPONED" - odloženo).
        """
        sql = """
            UPDATE Zapas 
            SET zacatek_zapasu = %s, stav = %s 
            WHERE id = %s
        """
        execute_query(sql, (novy_cas, stav, zapas_id), fetch="none")

    @staticmethod
    def delete(zapas_id):
        """
        Smaže zápas.
        Pozor na cizí klíče (předpovědi uživatelů na tento zápas musí být smazány, nebo nastaveny na CASCADE).
        """
        sql = "DELETE FROM Zapas WHERE id = %s"
        execute_query(sql, (zapas_id,), fetch="none")
    @staticmethod
    def get_by_tym(tym_id):
        """
        Načte všechny zápasy, kde tým (domácí nebo hostující) je zapojen.
        Vrací seznam (list) objektů Zapas.
        """
        sql = """
            SELECT id, kolo_id, domaci_tym_id, hostujici_tym_id, domaci_skore, hostujici_skore, zacatek_zapasu, stav
            FROM Zapas 
            WHERE domaci_tym_id = %s OR hostujici_tym_id = %s
            ORDER BY zacatek_zapasu ASC
        """
        rows = execute_query(sql, (tym_id, tym_id), fetch="all")
        return [Zapas(**row) for row in rows]