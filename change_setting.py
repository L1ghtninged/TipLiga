from app.dao.system_settings_dao import SystemSettingsDAO

setting_key = "season_tips_locked"
setting_value = "true"

if __name__ == "__main__":
    SystemSettingsDAO.update_setting(setting_key=setting_key, setting_value=setting_value)
    print(SystemSettingsDAO.get_season_settings())