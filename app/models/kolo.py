from datetime import datetime, timezone
class Kolo:
    def __init__(self, id = None, cislo_kola = None, is_closed = False, closed_at = None):
        self.id = id
        self.cislo_kola = cislo_kola
        self.is_closed = is_closed
        self.closed_at = closed_at
    def to_dict(self):
        return {
            "id": self.id,
            "cislo_kola": self.cislo_kola,
            "is_closed": self.is_closed,
            "closed_at": self.closed_at.isoformat() if self.closed_at else None
        }
    def close_round(self):
        self.is_closed = True
        self.closed_at = datetime.now(timezone.utc)
    def open_round(self):
        self.is_closed = False
        self.closed_at = None