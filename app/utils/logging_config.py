import logging
from logging.handlers import RotatingFileHandler
from datetime import datetime
from zoneinfo import ZoneInfo
import os


class PragueFormatter(logging.Formatter):

    def formatTime(self, record, datefmt=None):
        dt = datetime.fromtimestamp(
            record.created,
            tz=ZoneInfo("Europe/Prague")
        )

        if datefmt:
            return dt.strftime(datefmt)

        return dt.strftime("%Y-%m-%d %H:%M:%S")


def setup_logging(app):
    log_dir = "logs"
    os.makedirs(log_dir, exist_ok=True)

    file_handler = RotatingFileHandler(
        os.path.join(log_dir, "app.log"),
        maxBytes=5 * 1024 * 1024,
        backupCount=5
    )

    file_handler.setLevel(logging.INFO)

    formatter = PragueFormatter(
        "%(asctime)s [%(levelname)s] %(name)s: %(message)s"
    )

    file_handler.setFormatter(formatter)

    app.logger.addHandler(file_handler)
    app.logger.setLevel(logging.INFO)