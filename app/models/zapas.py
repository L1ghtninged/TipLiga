import datetime
class Zapas:
    def __init__(self, id, kolo_id, domaci_tym_id, hostujici_tym_id, domaci_skore, hostujici_skore, zacatek_zapasu, stav):
        self.id = id
        self.kolo_id = kolo_id
        self.domaci_tym_id = domaci_tym_id
        self.hostujici_tym_id = hostujici_tym_id
        self.domaci_skore = domaci_skore
        self.hostujici_skore = hostujici_skore
        self.zacatek_zapasu = zacatek_zapasu
        self.stav = stav
    def to_dict(self):
        return {
            "id": self.id,
            "kolo_id": self.kolo_id,
            "domaci_tym_id": self.domaci_tym_id,
            "hostujici_tym_id": self.hostujici_tym_id,
            "domaci_skore": self.domaci_skore,
            "hostujici_skore": self.hostujici_skore,
            "zacatek_zapasu": self.zacatek_zapasu,
            "stav": self.stav
        }