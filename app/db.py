import mysql.connector
from mysql.connector import pooling
from config import Config



db_config = {
    "pool_name": Config.DB_POOL_NAME,
    "pool_size": Config.DB_POOL_SIZE,
    "host": Config.DATABASE_HOST,
    "port": Config.DATABASE_PORT,
    "user": Config.DATABASE_USER,
    "password": Config.DATABASE_PASSWORD,
    "database": Config.DATABASE_NAME
}


try:
    connection_pool = pooling.MySQLConnectionPool(**db_config)
    print("Connection pool pro MySQL byl úspěšně vytvořen.")
except mysql.connector.Error as err:
    print(f"Chyba při inicializaci databázového poolu: {err}")
    raise err


# 3. Univerzální exekuční metoda
def execute_query(query: str, params: tuple = None, fetch: str = "none"):
    """
    Upravená verze, která podporuje fetch="all", fetch="one", fetch="none"
    """
    conn = None
    cursor = None
    try:
        conn = connection_pool.get_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute(query, params or ())

        # Kontrola textového parametru fetch
        if fetch == "all":
            return cursor.fetchall()
        elif fetch == "one":
            return cursor.fetchone()

        # Pokud je to "none", jde o zápis (INSERT/UPDATE/DELETE)
        conn.commit()

        if query.strip().upper().startswith("INSERT"):
            return cursor.lastrowid
        return cursor.rowcount

    except mysql.connector.Error as err:
        if conn and fetch == "none":
            conn.rollback()
        print(f"Databázová chyba: {err}")
        raise err
    finally:
        if cursor: cursor.close()
        if conn: conn.close()


def execute_batch_query(query: str, data_list: list) -> bool:
    """
    Pomocná funkce pro hromadné zápisy (INSERT/UPDATE) pomocí cursor.executemany().
    Používá transakce (commit/rollback). Vrací True při úspěchu, False při chybě.
    """
    conn = None
    cursor = None
    try:
        conn = connection_pool.get_connection()
        cursor = conn.cursor()

        conn.start_transaction()
        cursor.executemany(query, data_list)
        conn.commit()
        return True
    except mysql.connector.Error as err:
        if conn:
            conn.rollback()
        print(f"Databázová chyba při hromadném dotazu: {err}")
        return False
    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()