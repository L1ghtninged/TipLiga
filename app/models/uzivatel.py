class Uzivatel:
    def __init__(self, id = None, username = None, pocet_bodu = None, created_at=None):
        self.id = id
        self.username = username
        self.pocet_bodu = pocet_bodu
        self.created_at = created_at

    def to_dict(self):
        return {
            "id": self.id,
            "username": self.username,
            "pocet_bodu": self.pocet_bodu
        }