class PredpovedVysledku:
    def __init__(self, id, uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker=False, body_ziskane=0, created_at=None):
        self.id = id
        self.uzivatel_id = uzivatel_id
        self.zapas_id = zapas_id
        self.predpoved_domaci_skore = predpoved_domaci_skore
        self.predpoved_hostujici_skore = predpoved_hostujici_skore
        self.is_joker = is_joker
        self.body_ziskane = body_ziskane
        self.created_at = created_at