import os
from threading import Lock

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
EXCEL_PATH = os.path.join(BASE_DIR, 'data', 'tipovacka.xlsx')

excel_lock = Lock()