class PredpovedUmisteni:
    def __init__(self, id, uzivatel_id, tym_id, predpoved_pozice, body_ziskane):
        self.id = id
        self.uzivatel_id = uzivatel_id
        self.tym_id = tym_id
        self.predpoved_pozice = predpoved_pozice
        self.body_ziskane = body_ziskane
    def to_dict(self):
        return {
            "id": self.id,
            "uzivatel_id": self.uzivatel_id,
            "tym_id": self.tym_id,
            "predpoved_pozice": self.predpoved_pozice,
            "body_ziskane": self.body_ziskane
        }