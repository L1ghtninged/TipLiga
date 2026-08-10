from app.db import execute_query

class SystemSettingsDAO:
    @staticmethod
    def get_season_settings():  
        sql = """
            SELECT id, setting_key, setting_value
            FROM system_settings
        """

        return execute_query(sql, fetch="all")
    @staticmethod
    def is_season_evaluated():
        sql = """
            SELECT setting_value
            FROM system_settings
            WHERE setting_key = %s
        """

        row = execute_query(
            sql,
            ( "season_evaluated", ),
            fetch="one"
        )

        if row is None:
            return False

        return row["setting_value"].lower() == "true"
    @staticmethod
    def update_setting(setting_key, setting_value):
        sql = """
            UPDATE system_settings
            SET setting_value = %s
            WHERE setting_key = %s
        """

        execute_query(
            sql,
            (setting_value, setting_key)
        )
